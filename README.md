# Pakr <img src="https://raw.githubusercontent.com/yieme/pakr/master/logo.png" align="right" width="128" border="0" />

Package Server to enable client side use of packages by name and version. Use the [Pakr CDN](http://pakr.yie.me) directly or spin up your own server and leverage the powerful [CloudFlare](https://www.cloudflare.com/) CDN network and serve content from your own domain.

## CDN Statistics

| CDN | Packages | Package Versions | Source |
| --- | ---: | ---: | --- |
| [pakr](./) | 2,346 | 18,259 | internal |
| [jsdelivr](http://www.jsdelivr.com/) | 1,456 | 3,957 | *1 |
| [cdnjs](https://cdnjs.com/.com) | 1,218 | 13,145 | *2 |
| [google](https://developers.google.com/speed/libraries/) | 14 | 301 | *3 |
| [bootstrap](http://www.bootstrapcdn.com/) | 6 | 86 | *4 |

## Examples

- Latest jQuery library: [jquery](http://pakr.yie.me/jquery)
- Latest Bootstrap 3.3 patch: [bootstrap@3.3](http://pakr.yie.me/bootstrap@3.3)
- Specific AngularJS version: [angularjs@1.3.15](http://pakr.yie.me/angularjs@1.3.15)
- Latest path of jQuery 2.1 and minor version of Bootstrap 3 together: [jquery@2.1,bootstrap@3](http://pakr.yie.me/jquery@2.1,bootstrap@3)
- Bootstrap CSS (as JS is the default): [bootstrap@2/css](http://pakr.yie.me/bootstrap@2/css)
- Bootswatch shorthand: [bootswatch@3/flatly](http://pakr.yie.me/bootswatch@3/flatly)
```

## [api](http://pakr.yie.me/api)

```js
{
	'website':                      '/',
	'api_docs':                     '/api',
	'package_details':              '/api/{package}',
	'latest_package_versions':      '/api/latest/{search}',
	'latest_package':               '/{package}',
	'versioned_package':            '/{package}@{version}',
	'bundled_packages':             '/{package}[@{version}],{package}[@version]...',
	'bootswatch_packages':          '/bootswatch[@version]/{variant}'
}
```

## Sources

1. [jsdelivr libraries](http://api.jsdelivr.com/v1/jsdelivr/libraries) 2015-05-21
2. [cdnjs libraries](http://api.jsdelivr.com/v1/cdnjs/libraries) 2015-05-21
3. [google libraries](http://api.jsdelivr.com/v1/google/libraries) 2015-05-21
4. [bootstrap libraries](http://api.jsdelivr.com/v1/bootstrap/libraries) 2015-05-21

## Rights

Copyright (C) 2015 by Yieme, License: MIT
