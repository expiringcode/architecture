'use strict';
var manifest   = require('./package.json');
module.exports = {
	name: manifest.name,
	path: __dirname,
	manifest: manifest,
	aliases: {
		
	},
	init : function(){
		return require('./main.js');
	}
};
