'use strict';

var os            = require('os')
var Dias          = require('dias')
var pkg           = require('./package.json')
var Logger        = require('ceo-logger')
var middleServer  = require('middle-server')
var proxyPackage  = require('proxy-cache-packages')

Dias(function(dias) {
  var logVariables  = { server: { id: pkg.name, ver: pkg.version, ua: dias.useragent, node: dias.node, pid: process.pid } }
  var logger = new Logger(logVariables, true)

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
      logger.info('type: ' + headers.type + ', body: ' + data.body.substr(0,55) + '..., length: ' + data.body.length)
    })
  }

  function logError(err, req, res, next) {
    logger.error(err.stack)
    res.status(500).send(err.message)
  }

  process.on('uncaughtException', function (err) {
    logger.error(err)
  })

  middleServer({
    logger: logger,
    post:   [ packageMiddle, logError ]
  })
})
