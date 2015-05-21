# pakr

Package Server

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

## Rights

Copyright (C) 2015 by yieme, License: MIT
