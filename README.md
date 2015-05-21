# Pakr <img src="https://raw.githubusercontent.com/yieme/pakr/master/logo.png" align="right" width="128" border="0" />

Package Server to enable client side use of packages by name and version. Use the [Pakr CDN](http://pakr.yie.me) directly or spin up your own server and serve content from your own domain.

## CDN Statistics

| CDN | Packages | Package Versions | Source |
| --- | ---: | ---: | --- |
| [pakr](./) | 2,346 | 18,259 | internal |
| [jsdelivr](http://www.jsdelivr.com/) | 1,456 | 3,957 | [jsdelivr libraries](http://api.jsdelivr.com/v1/jsdelivr/libraries) |
| [cdnjs](https://cdnjs.com/.com) | 1,218 | 13,145 | [cdnjs libraries](http://api.jsdelivr.com/v1/cdnjs/libraries) |
| [google](https://developers.google.com/speed/libraries/) | 14 | 301 | [google libraries](http://api.jsdelivr.com/v1/google/libraries)  |
| [bootstrap](http://www.bootstrapcdn.com/) | 6 | 86 | [bootstrap libraries](http://api.jsdelivr.com/v1/bootstrap/libraries) |

## Examples

#### Latest jQuery library: [jquery](http://pakr.yie.me/jquery)

```html
<script src="http://pakr.yie.me/jquery"></script>
```

#### Bootstrap 3.3.x: [bootstrap@3.3](http://pakr.yie.me/bootstrap@3.3)

```html
<script src="http://pakr.yie.me/bootstrap@3.3"></script>
```

#### Specific AngularJS version: [angularjs@1.3.15](http://pakr.yie.me/angularjs@1.3.15)

```html
<script src="http://pakr.yie.me/angularjs@1.3.15"></script>
```

#### jQuery 2.1.x and Bootstrap 3.x: [jquery@2.1,bootstrap@3](http://pakr.yie.me/jquery@2.1,bootstrap@3)

```html
<script src="http://pakr.yie.me/jquery@2.1,bootstrap@3"></script>
```

#### Bootstrap CSS (as package default is JS): [bootstrap@2/css](http://pakr.yie.me/bootstrap@2/css)

```html
<link href="http://pakr.yie.me/bootstrap@2/css" rel="stylesheet" type="text/css">
```

#### Bootswatch shorthand: [bootswatch@3/flatly](http://pakr.yie.me/bootswatch@3/flatly)

```html
<link href="http://pakr.yie.me/bootswatch@3/flatly" rel="stylesheet" type="text/css">
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

## Statistics

Last updated: ```2015-05-21```

## Rights

Copyright (C) 2015 by Yieme, License: MIT
