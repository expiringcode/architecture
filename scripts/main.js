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

////////////
// Assets //
////////////

app.cli
.command('assets')
.description('Generate assets')
.action(function() {
	var self = this;

	reqTiProjectOrExit();

	var ticons = require('ticons');

	app.out.step("Removing low resolution directories...");
	try {
		app.fs.deleteDirSync('app/assets/android/images');
		app.fs.deleteDirSync('app/assets/images');
		app.out.writeln("OK");
	} catch (err) {}

	app.out.step("Generating assets...");
	ticons.assets({}, function(err, status) {
		if (err) {
			app.out.exit(err);
			return;
		}
		app.out.writeln("OK");
	});
});

/////////////////////////////
// Install developer build //
/////////////////////////////

app.cli
.command('devinstall')
.option('-p, --platform <platform>', 'Platforms to build for', /^(ios|android|all)$/i, 'all')
.description('Install current developer build on the device')
.action(function() {
	var self = this;

	reqTiProjectOrExit();

	var tiapp = require('tiapp.xml').load();

	if (this.platform === 'ios' || this.platform === 'all') {
		app.out.step("Installing developer build <b>" + tiapp.name + " v" + tiapp.version + "</b> for <b>iOS</b>...");
		shell.exec('ideviceinstaller -i "./build/iphone/build/Products/Debug-iphoneos/' + tiapp.name + '.ipa"');
	}

	if (this.platform === 'android' || this.platform === 'all') {
		app.out.step("Installing developer build <b>" + tiapp.name + " v" + tiapp.version + "</b> for <b>Android</b>...");
		shell.exec('adb install "./build/android/bin/' + tiapp.name + '.apk"');
	}
});