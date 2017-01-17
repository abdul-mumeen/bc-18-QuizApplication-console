#!/usr/bin/env node
'use strict';
var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var vorpal 		= require('vorpal')();


var files 		= require('../bc-18-quizapplication-console/files.js');
var qz 			= require('../bc-18-quizapplication-console/quizzes.js');
var usr 		= require('../bc-18-quizapplication-console/users.js');
/*var obj = files.getObjectFromFile("quizzes.json");
console.log(obj[0].name);
var q = new qz.Quizzes();
q.takeQuiz("physics");


var user = new usr.User("jeremy");
var chk = user.checkUserExist();
if (chk)
{
	console.log("found");
}
else
{
	var success = user.createUser();
	if (success)
	{
		console.log("User has been created");
	}
	else
	{
		console.log("User cannot be created at this time");
	}
}*/
clear();
console.log(
  chalk.yellow(
    figlet.textSync('A-QUIZ', { horizontalLayout: 'full' })
  )
);
vorpal
    .delimiter('a-quiz$')
    .show();
vorpal
      .command('duck', 'Outputs "rabbit"')
      .action(function(args, callback) {
        this.log('Wabbit');
        callback();
      });