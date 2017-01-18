#!/usr/bin/env node
'use strict';
var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var vorpal 		= require('vorpal')(), username = "";


var files 		= require('../bc-18-quizapplication-console/files.js');
var qz 			= require('../bc-18-quizapplication-console/quizzes.js');
var usr 		= require('../bc-18-quizapplication-console/users.js');

var tkQuiz = function(quizName,username)
{
	var q = new qz.Quizzes();
	var rp = q.takeQuiz(quizName, username);
	return rp;
}
/*var obj = files.getObjectFromFile("quizzes.json");
console.log(obj[0].name);
var q = new qz.Quizzes();
q.takeQuiz("physics");*/
var listQuizzes = function()
{
	var q = new qz.Quizzes();
	return q.getQuizzes();
}
var getUsername = function(username)
{
	var user = new usr.User(username);
	var chk = user.checkUserExist();
	if (chk)
	{
		return "Welcome back " + username;
	}
	else
	{
		var success = user.createUser();
		if (success)
		{
			return "Seems you are a new user, we have created an account for you.";
		}
		else
		{
			return "User account cannot be created at this time, try again later";
		}
	}
}
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
      .command('username [name]', 'get yoor username')
      .action(function(args, callback) {
      	if(args.name === undefined)
      	{
      		this.log("You need to enter a username with that command");
      	}
      	else
      	{
      		username = args.name;
        	this.log(getUsername(args.name));
    	}
        callback();
      });
vorpal
      .command('takequiz [quizname]', 'take a quiz')
      .action(function(args, callback) {
      	if (args.quizname !== undefined)
      	{
      		if (username !== "") 
  			{
  				vorpal.hide();
  				if (tkQuiz(args.quizname,username) !== false)
  				{
	      			//this.log(report);
	      			//vorpal.show();
	      		}
	      		else
	      		{
	      			this.log("You need to enter a quiz name from the list of quizzes in the local storage");
	      			vorpal.show();
	      		}
  			}
  			else
  			{
  				this.log("You need to enter your username before you can take a quiz");
  			}
      	}
      	else
      	{
      		this.log("You need to enter a quiz name with the command");
      	}
        callback();
      });
vorpal
      .command('listquizzes', 'list the quizzes available in local storage')
      .action(function(args, callback) {
      	this.log(listQuizzes());
        callback();
      });
vorpal
      .command('importquiz [filepath]', 'list the quizzes available in local storage')
      .action(function(args, callback) {
      	this.log(listQuizzes());
        callback();
      });

