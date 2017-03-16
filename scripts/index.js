#!/usr/bin/env node
'use strict';

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
var fs				= require('fs-extended');
var exec 			= child_process.execSync;
const containers 	= "https://github.com/caffeinalab/docker-webdev-env";

var log = (err, stdout, stderr) => {
	console.log(err, stdout, stderr);
	if (err) error(err);
};

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

// Log an event to the CLI + GA, and miserably exit
function error(msg, code, dont_exit) {
	process.stdout.write(msg.red);

	if (dont_exit == false) {
		process.exit( code || 1 );
	}
}

function reqEnvOrExit(){
	if (!fs.existsSync('.env')) {
		process.stdout.write('.env file is missing. Generate it with `gen env`');
	}
}
function gitCleanOrExit() {
	var out = exec('git status --porcelain').output || '';
	var lines = (out.match(/\n/g) || []).length;
	if (lines > 0) {
		process.stdout.write('Current working directory is not clean. Please commit current changes before doing anything');
	}
}

function gitTag(version) {
	process.stdout.write("Tagging current changes...");
	exec('git tag -d "' + version + '"');
	exec('git tag "' + version + '" && git push --tags');
}

function gitCommit(message) {
	process.stdout.write("Commiting current changes...");
	exec('git add -A && git commit -am "' + message + '" && git push');
}

function createProject(name) {
	process.stdout.write("Creating new project ".green + name +  "".green);

	var cmd = [];

	cmd.push('git clone ' + containers + " " + name);
	cmd.push('cd ' + CWD + "/" + name);
	cmd.push('ls -lash');
	exec(cmd, log);
	//exec('touch config.json');
	//exec("echo {" + JSON.stringify(config) + "} | tee config.json");
}

function selectServices() {
	//prompt;
}

function build(type) {
	process.stdout.write("Building docker for the specified environment".green);

	var cmd = "docker-compose -f docker-compose.yml ";
	if (type == "dev") {
		cmd += "-f docker-compose.dev.yml up -d --build --remove-orphans";
	} else if (type == "prod") {
		cmd += "up -d --build";
	}

	exec(cmd);
}

function clean() {
	process.stdout.write("Careful! This command is to be used only on development environments".yellow);
	process.stdout.write("\nIt will delete all docker networks and volumes along with all orphan containers".red);

	exec("docker network prune -f && docker volume prune -f");
}

function loadBalancer() {
	process.stdout.write("Creating main network and load balancer".green);
	
	var exists = exec("docker network ls | grep -c network_main", (error, stdout, stderror) => {
		if (error) return;
		if (stdout) {
			console.log(stdout);
		}
	});
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
.command('create')
.description('Initialize a new project')
.action(function(name) {
	var self = this;
	if (!name) return false;
	
	createProject(name);
});

program
.command('build')
.description('Build the project')
.action(build);

program
.command('clean')
.description('Clean the whole docker environment')
.action(clean);

program
.command('lb')
.description('Create a load balancer and the main network where to attach all the projects')
.action(loadBalancer);



// Parse the input arguments
program.parse(process.argv);

// Start commander
if (program.args.length === 0 || typeof program.args[program.args.length - 1] === 'string') {
	program.help();
} else {
	
}