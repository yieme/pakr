'use strict';

var cmp     = require('semver-compare')
var ignore  = ['latest', 'cdn', 'mains', 'files', 'description', 'homepage']
var API_URI = '/api/package/'
var options = {
  packages: {},
  pretty:   true
}

function init(param) {
  options.packages = param.packages || options.packages
  options.pretty   = ('undefined' == typeof param.pretty) ? options.pretty : param.pretty
}

function apiPackage(req, res, next) {
	var part     = req.path.split(API_URI)
	if (!part[1] || part[0] != '') return next()
	var name = part[1]
	var pack = options.packages[name]
	if (!pack) return next({ code: 404, error: 'Invalid package: ' + name })

	var versions = []
	for (var i in pack) {
    if (ignore.indexOf(i) < 0) {
			versions.push(i)
    }
  }
	var result = { name: name, latest: pack.latest, versions: versions.sort(cmp) }
  res.set('Content-Type', 'application/json') // JSONP: application/javascript
	var json = (options.pretty) ? JSON.stringify(result, null, 2) : JSON.stringify(result)
  res.status(200).send(json)
}



module.exports = apiPackage
module.exports.init = init
