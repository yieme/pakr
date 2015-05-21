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

Dias(function(dias) {
  var logVariables  = { server: { id: pkg.name, ver: pkg.version, ua: dias.useragent, node: dias.node, pid: process.pid } }
  var logger        = new Logger(logVariables, false)
  var config        = {
    dir:        './tmp',
    logRequest: true
  }
  proxyPackage(config)
  var packages = proxyPackage.init()
  apiLatest.init({ packages: packages })
  apiPackage.init({ packages: packages })

  function packageMiddle(req, res, next) {
    proxyPackage(req, function proxyResults(err, data) {
      if (err) return next(err)
      var headers = data.headers
      var body    = data.body
      if (headers.type) res.type(headers.type)
      if (headers.code && headers.code >= 400) {
        res.status(headers.code).send(body)
        return
      }
      res.send(body)

      if (config.logRequest) {
        logger.info('type: ' + headers.type + ', length: ' + data.body.length)
      }
    })
  }

  function logError(err, req, res, next) {
    logger.error(err.stack)
    res.status(500).send({ code: 500, error: err.message })
  }

  process.on('uncaughtException', function (err) {
    logger.error(err)
    logger.error(err.stack)
  })

  middleServer({
    logger: logger,
    pre:    [
      middleServer.log,
      middleServer.ignoreFavicon,
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
