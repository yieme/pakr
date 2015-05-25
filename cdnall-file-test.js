var cdnall_data = require('./cdnall_data.json')
var packages = cdnall_data.packages
var allFiles   = {}
var extensions = {}
var packcount = 0
var uniquecount = 0
var colidecount = 0
var filecount = 0
for (var name in packages) {
	packcount++
	var pack      = packages[name]
	var packfiles = pack.files
	var allPack   = {}
	for (var i=0; i < packfiles.length; i++) {
		var files = packfiles[i].split(',')
		for (var f=0; f < files.length; f++) {
			var file = files[f]
			filecount++
			if (!allPack[file]) {
				allPack[file] = 1
				uniquecount++
			}
		} // endfor f
	} // endfor i
	for(file in allPack) {
		if (allFiles[file]) {
			colidecount++
//			console.log(file, allFiles[file], name)
		} else {
			var part = file.split('.')
			var ext  = part[part.length-1]
			var cleanext = ext.replace('README', '').replace('LICENSE', '').replace('DS_Store', '').replace('gitignore', '').replace('gitkeep','').replace('/', '')
			if (cleanext == ext) extensions[ext] = (extensions[ext]) ? extensions[ext] + 1 : 1
			allFiles[file] = name
		}
	}
} // endfor name
console.log('packcount:', packcount)
console.log('filecount:', filecount)
console.log('uniquecount:', uniquecount)
console.log('colidecount:', colidecount)
console.log('extensions:', extensions)
