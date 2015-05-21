# Pakr <img src="https://raw.githubusercontent.com/yieme/pakr/master/logo.png" align="right" width="128" border="0" />

Package Server to enable client side use of packages by name and version. Use the [Pakr CDN](http://pakr.yie.me) directly or spin up your own server and leverage the powerful [CloudFlare](https://www.cloudflare.com/) CDN network and serve content from your own domain.

## CDN Statistics

CDN | Packages | Package Versions | Sources
--- | ---: | ---:
[bootstrap](http://www.bootstrapcdn.com/) | 6 | 86 | *1
[jsdelivr](http://www.jsdelivr.com/) | 1,456 | 3,957 | *2
[google](https://developers.google.com/speed/libraries/) | 14 | 301 | *3
[cdnjs](https://cdnjs.com/.com) | 1,218 | 13,145 | *4
[pakr](./) | 2,346 | 18,259 | internal

## [api](/api)

```js
{
	'website':                      '/',
	'api_docs':                     '/api',
	'package_details':              '/api/{package}',
	'latest_package_versions':      '/api/latest/{search}',
	'latest_package':               '/{package}',
	'versioned_package':            '/{package}@{version}',
	'bundled_packages':             '/{package}[@{version}],{package}[@version]...',
	'bootswatch_packages':          '/bootswatch[@version]/{variant}',

	'example_latest_jquery':        '/jquery',
	'example_bootstrap_3.3.x':      '/bootstrap@3.3',
	'example_angular_1.3.15':       '/angularjs@1.3.15',
	'example_jquery_and_bootstrap': '/jquery@2.1,bootstrap@3',
	'example_bootstrap_2.x_css':    '/bootstrap@2/css',
	'example_bootswatch':           '/bootswatch@3/flatly',
}
```

## Sources

1. [bootstrap libraries](http://api.jsdelivr.com/v1/bootstrap/libraries) 2015-05-21
2. [jsdelivr libraries](http://api.jsdelivr.com/v1/jsdelivr/libraries) 2015-05-21
3. [google libraries](http://api.jsdelivr.com/v1/google/libraries) 2015-05-21

## Rights

Copyright (C) 2015 by Yieme, License: MIT
