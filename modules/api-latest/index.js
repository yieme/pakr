'use strict';

var API_URI  = '/api/latest/'
var cacheDur = (process.env.NODE_ENV == 'production') ? 60 * 60 * 1000 : 15 * 1000 // 1 hour in production, 15 seconds dev
var options  = {
  packages: {},
  pretty: true
}

function init(param) {
  options.packages = param.packages || options.packages
  options.pretty   = ('undefined' == typeof param.pretty) ? options.pretty : param.pretty
}

function latestPack(name, pack) {
  var result = name + '@' + pack.latest
  return result
}

function getGitHub(url) {
  if (!url) return
  url = url.replace('http://', '').replace('https://', '').replace('//', '')
  var part = url.split('/')
  var domain = part[0]
  if (domain == 'github.com') {
    if (part.length == 3) return part[1] + '/' + part[2]
    return
  }
  var part2 = domain.split('.')
  if (part2[1] == 'github') {
    return part2[0] + '/' + part[1]
  }
}

function apiLatest(req, res, next) {
  var part     = req.path.split(API_URI)
  if (!part[1] || part[0] != '') return next()
  var search   = part[1]
  var all      = (search == '*')
  var result   = []
  var packages = options.packages
  for (var packname in packages) {
    if (packname && (all || packname.indexOf(search) >= 0)) {
      var pack   = packages[packname]
      var github = getGitHub(pack.homepage)
      var data   = {
        name:        packname,
        latest:      pack.latest,
        description: pack.description,
        homepage:    pack.homepage,
        github:      github
      }
      result.push(data)
    }
  }
  res.set('Cache-Control', 'public, max-age=' + cacheDur)
  res.set('Content-Type', 'application/json') // JSONP: application/javascript
  var json = (options.pretty) ? JSON.stringify(result, null, 2) : JSON.stringify(result)
  res.locals.statusCode = 200
  res.status(200).send(json)
}



module.exports      = apiLatest
module.exports.init = init
