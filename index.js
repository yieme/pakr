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
var compression   = require('compression')()
var LRU           = require('lru-cache')
var prefix        = process.env.PREFIX || '/'
var prefixLength  = prefix.length
var cache         = LRU()
var favicon       = require('serve-favicon')(__dirname + '/favicon.ico')
var pakrStatic    = process.env.STATIC_URL || 'http://pakr-static.yie.me'
var cacheDur      = (process.env.NODE_ENV == 'production') ? 60 * 60 * 1000 : 15 * 1000 // 1 hour in production, 15 seconds dev
var domain        = {
  jsdelivr:   'https://cdn.jsdelivr.net/$package/$version/$file',
  cdnjs:      'https://cdnjs.cloudflare.com/ajax/libs/$package/$version/$file',
  google:     'https://ajax.googleapis.com/ajax/libs/$package/$version/$file',
  bootstrap:  'https://maxcdn.bootstrapcdn.com/$package/$version/$file',
  bootswatch: 'https://maxcdn.bootstrapcdn.com/bootswatch/$version/$package/$file',
  pakr:       pakrStatic + '/$package/$version/$file', // proxy-cache-multi-domain override to include local files
}
var packageList = [ 'cdnall_data.json' ]
//  packageDataUrl:   'https://pub.firebaseio.com/cdn',
if (pakrStatic) packageList.push(pakrStatic + '/pakr.json')


function compressible(type) {
  if (!type || typeof type !== "string") return false

  // Strip charset
  var i = type.indexOf(';')
  if (~i) type = type.slice(0, i)

  // handle types that have capitals or excess space
  type = type.trim().toLowerCase()

  // attempt to look up from database; fallback to regex if not found
  var mime = mimedb[type]
  return mime ? mime.compressible : /^text\/|\+json$|\+javascript$|\+ttf$|\+woff$|\+text$|\+xml$/.test(type)
}



Dias(function(dias) {
  var serverId      = { id: pkg.name, ver: pkg.version, node: dias.node, pid: process.pid }
  var ua            = process.env.USERAGENT || dias.useragent || (dias.paas) ? 'paas/' + dias.paas + ' host/' + dias.host : undefined
  if (ua) serverId.ua = ua
  var logVariables  = { server: serverId }
  var logLevel      = (process.env.DEBUG) ? 'debug' : undefined
  logLevel          = logLevel || process.env.LOG_LEVEL
  var logger        = new Logger(logVariables, false, logLevel)
  var config        = {
    dir:        './tmp',
    logger:     logger,
    domain:     domain,
    skipInit:   true, // skip initial initialization in proxyPackage() below, as init will be done manually. avoids double loading
    packageDataUrl: packageList
  }
  proxyPackage(config)
  var packages = proxyPackage.init()
  apiLatest.init({ packages: packages })
  apiPackage.init({ packages: packages })


  function respondWithData(req, res, data) {
    if (data.redirect) {
      logger.info(req.url + ', redirect: ' + data.redirect)
      res.set('Cache-Control', 'public, max-age=' + cacheDur)
      res.redirect(307, data.redirect)
      return
    }
    var headers = data.headers
    var stream  = data.stream
    var body    = data.body
    if (headers.type) res.set('Content-Type', headers.type)
    res.set('Cache-Control', 'public, max-age=' + cacheDur)
    if (stream) {
      stream.pipe(res)
      logger.debug(headers.code + ' ' + req.url  + ', type: ' + headers.type + ', stream')
      return
    } else if (headers.code && headers.code >= 400) {
      res.status(headers.code).send(body)
      logger.info(headers.code + ' ' + req.url  + ', type: ' + headers.type + ', length: ' + data.body.length)
    } else {
      res.send(body)
      logger.debug(headers.code + ' ' + req.url  + ', type: ' + headers.type + ', length: ' + data.body.length)
    }
  }

  function packageMiddle(req, res, next) {
    if (req.url.indexOf(prefix) != 0) return next() // prefix must match
    req.url = req.url.replace(prefix, '')  // remove prefix
    var cachedData = cache.get(req.url)
    if (cachedData) {
      logger.debug('LRU Cached: ' + req.url)
      return respondWithData(req, res, JSON.parse(cachedData))
    }
    proxyPackage(req, function proxyResults(err, data) {
      if (err) return next(err)
      respondWithData(req, res, data)
      if (!data.stream) {
        logger.debug('LRU Cache: ' + req.url)
        cache.set(req.url, JSON.stringify(data))
      }
    })
  }

  function logError(err, req, res, next) {
    logger.debug('logError:' + err)
    if ('string' == typeof err) {
      if (err.indexOf('Not Found') >= 0) {
        logger.info(err + ' logError')
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
    next(err)
  }

  process.on('uncaughtException', function (err) {
    logger.error('uncaughtException')
    logger.error(err)
    logger.error(err.stack)
  })

  var app = middleServer({
    logger: logger,
    pre:    [
      compression,
      middleServer.log,
      favicon,
      apiDoc,
      apiLatest,
      apiPackage
    ],
    post:   [
      packageMiddle
    ]
  })
  app.use(logError)
  app.locals._log = logger
})
