'use strict';

var os            = require('os')
var Dias          = require('dias')
var pkg           = require('./package.json')
var Logger        = require('ceo-logger')
var middleServer  = require('middle-server')
var proxyPackage  = require('proxy-cache-packages')
var apiDoc        = require('./modules/api-doc')
var apiLatest     = require('./modules/api-latest')
var apiPackage    = require('./modules/api-package')
var favicon       = require('serve-favicon')(__dirname + '/favicon.ico')
var pakrStatic    = process.env.STATIC_URL || 'http://pakr-static.yie.me'
var domain        = {
  pakr:       pakrStatic + '/$package/$version/$file', // proxy-cache-multi-domain override to include local files
  cdnjs:      'https://cdnjs.cloudflare.com/ajax/libs/$package/$version/$file',
  jsdelivr:   'https://cdn.jsdelivr.net/$package/$version/$file',
  google:     'https://ajax.googleapis.com/ajax/libs/$package/$version/$file',
  bootstrap:  'https://maxcdn.bootstrapcdn.com/$package/$version/$file',
  bootswatch: 'https://maxcdn.bootstrapcdn.com/bootswatch/$version/$package/$file',
}
var packageList = [
  'cdnall_data.json',
  pakrStatic + '/pakr.json',
]


Dias(function(dias) {
  var logVariables  = { server: { id: pkg.name, ver: pkg.version, ua: dias.useragent, node: dias.node, pid: process.pid } }
  var logger        = new Logger(logVariables, false)
  var config        = {
    dir:        './tmp',
    logRequest: true, // log request transformations in proxy-cache-* layers // TODO: change to debug
    domain:     domain,
    skipInit:   true, // skip initial initialization in proxyPackage() below, as init will be done manually. avoids double loading
    packageDataUrl: packageList
  }
  proxyPackage(config)
  var packages = proxyPackage.init()
  apiLatest.init({ packages: packages })
  apiPackage.init({ packages: packages })

  function packageMiddle(req, res, next) {
    proxyPackage(req, function proxyResults(err, data) {
      if (err) return next(err)
      if (data.redirect) {
        logger.info(req.url + ', redirect: ' + data.redirect)
        res.redirect(307, data.redirect)
        return
      }
      var headers = data.headers
      var body    = data.body
      if (headers.type) res.type(headers.type)
      if (headers.code && headers.code >= 400) {
        res.status(headers.code).send(body)
        return
      }
      res.send(body)

      if (config.logRequest) {
        logger.info(req.url + ', type: ' + headers.type + ', length: ' + data.body.length)
      }
    })
  }

  function logError(err, req, res, next) {
    if ('string' == typeof err) {
      if (err.indexOf('Not Found') >= 0) {
        logger.info(err)
        res.status(404).send({ code: 404, error: err.replace(': /', ': ') })
        return
      } else {
        logger.warn(err)
      }
    } else {
      logger.error(err)
      if (err.stack) logger.error(err.stack)
    }
    res.status(500).send({ code: 500, error: err.message || err })
  }

  process.on('uncaughtException', function (err) {
    logger.error(err)
    logger.error(err.stack)
  })

  middleServer({
    logger: logger,
    pre:    [
      middleServer.log,
      favicon,
      apiDoc,
      apiLatest,
      apiPackage
    ],
    post:   [
      packageMiddle,
      logError
    ]
  })
})
