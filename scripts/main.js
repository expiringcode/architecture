var CWD = process.cwd();
var async = require('async');
var sizeOf = require('image-size');
var gm = require('gm');
var path = require('path');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function reqEnvOrExit(){
	if (!app.fs.existsSync('.env')) {
		app.out.exit('.env file is missing. Generate it with `gen env`');
	}
}
function gitCleanOrExit() {
	var out = shell.exec('git status --porcelain').output || '';
	var lines = (out.match(/\n/g) || []).length;
	if (lines > 0) {
		app.out.exit('Current working directory is not clean. Please commit current changes before doing anything');
	}
}

function gitTag(version) {
	app.out.step("Tagging current changes...");
	shell.exec('git tag -d "' + version + '"');
	shell.exec('git tag "' + version + '" && git push --tags');
}

function gitCommit(message) {
	app.out.step("Commiting current changes...");
	shell.exec('git add -A && git commit -am "' + message + '" && git push');
}

function createProject(name) {
	shell.exec('mkdir -p name');
}

////////////
// Init P //
////////////

app.cli
.command('init')
.description('Initialize project')
.action(function() {
	var self = this;

	app.out.step("Removing low resolution directories...", JSON.stringify(self));
});
