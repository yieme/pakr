'use strict';

var API_URI        = '/api'

function apiDoc(req, res, next) {
  if (req.path != API_URI) return next()

  var docs = {
    website:                        '/',
    api_docs:                       '/api',
    package_details:                '/api/{package}',
    latest_package_versions:        '/api/latest/{search}',
//    cdn_stats:                      '/api/stats/comparison',
    latest_package:                 '/{package}',
    versioned_package:              '/{package}@{version}',
    bundled_packages:               '/{package}[@{version}],{package}[@version]...',
    bootswatch_packages:            '/bootswatch[@version]/{variant}',
    '':                             '',
    'example_latest_jquery':        '/jquery',
    'example_bootstrap_3.3.x':      '/bootstrap@3.3',
    'example_angular_1.3.15':       '/angularjs@1.3.15',
    'example_jquery_and_bootstrap': '/jquery@2.1,bootstrap@3',
    'example_bootstrap_2.x_css':    '/bootstrap@2/css',
    'example_bootswatch':           '/bootswatch@3/flatly',
  }
  res.set('Content-Type', 'application/json') // JSONP: application/javascript
  res.status(200).send(JSON.stringify(docs, null, 2))
}



module.exports = apiDoc
