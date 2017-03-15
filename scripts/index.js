#!/usr/bin/env node

var manifest   		= require('./package.json');
var CWD 			= process.cwd();
var async 			= require('async');
var gm 				= require('gm');
var path 			= require('path');
var program 		= require('commander');
var _ 				= require('underscore');
var inquirer 		= require('inquirer');
var prompt 			= require('prompt');
var child_process	= require('child_process');
var config 			= require('./config.json');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

// Log an event to the CLI + GA, and miserably exit
function error(msg, code, dont_exit) {
	ga.event("installation", "error", msg).send();
	process.stdout.write(msg.red);

	if (dont_exit == false) {
		process.exit( code || 1 );
	}
}

function reqEnvOrExit(){
	if (!app.fs.existsSync('.env')) {
		process.stdout.write('.env file is missing. Generate it with `gen env`');
	}
}
function gitCleanOrExit() {
	var out = child_process.exec('git status --porcelain').output || '';
	var lines = (out.match(/\n/g) || []).length;
	if (lines > 0) {
		process.stdout.write('Current working directory is not clean. Please commit current changes before doing anything');
	}
}

function gitTag(version) {
	process.stdout.write("Tagging current changes...");
	child_process.exec('git tag -d "' + version + '"');
	child_process.exec('git tag "' + version + '" && git push --tags');
}

function gitCommit(message) {
	process.stdout.write("Commiting current changes...");
	child_process.exec('git add -A && git commit -am "' + message + '" && git push');
}

function createProject(name) {
	child_process.exec('mkdir -p ' + name);
	child_process.exec('cd ' + name);
	child_process.exec('touch config.json');
	child_process.exec("echo " + JSON.stringfiy(config) + "| tee config.json");
}

/////////////////////////
// Configure commander //
/////////////////////////

program
.version(manifest.version, '-v, --version')
.description(manifest.description)
.usage('command <args> [options]');

////////////
// Init P //
////////////

program
.command('init')
.description('Initialize project')
.action(function(name) {
	var self = this;
	if (!name) return false;
	
	createProject(name);
});





// Parse the input arguments
program.parse(process.argv);

// Start commander
if (program.args.length === 0 || typeof program.args[program.args.length - 1] === 'string') {
	program.help();
} else {
	
}