'use strict';
var inquirer = require('inquirer');
var files = require('../bc-18-quizapplication-console/files.js');
module.exports = 
{
	Quizzes : function()
	{
		this.name = "";
		this.noOfQuestions = 0;
		this.questions = [];
		this.expectedTime = 0;
		this.answers = [];
	}
};
module.exports.Quizzes.prototype.findQuiz = function(quizName)
{
	var found = false;
	var quizzes = [];
	quizzes = files.getObjectFromFile("quizzes.json");
	if (quizzes !== false)
	{
		for(var i = 0; i < quizzes.length; i++)
		{
			if (quizzes[i].name === quizName)
			{
				this.name = quizzes[i].name;
				//this.noOfQuestions = quizzes[i].questions.length;
				this.questions = quizzes[i].questions;
				this.expectedTime = quizzes[i].expectedTime;
				this.answers = quizzes[i].answers;
				this.noOfQuestions = quizzes[i].noOfQuestions;
				found = true;
				break;
			}
		}
	}
	return found;
}

module.exports.Quizzes.prototype.getQuizzes = function(quizName)
{
	var quizz = "";
	var quizzes = [];
	quizzes = files.getObjectFromFile("quizzes.json");
	if (quizzes !== false)
	{
		for(var i = 0; i < quizzes.length; i++)
		{
			quizz += "\t\t" + quizzes[i].name + "\n";
		}
	}
	else
	{
		quizz += "\t\t ***There are no quizzes in the local storage***";
	}
	return quizz;
}

module.exports.Quizzes.prototype.takeQuiz = function(quizName,username,callback)
{
	var found = this.findQuiz(quizName);
	if (found)
	{
		var objQuiz = this;
		console.log("\tYou are about to take %s quiz with %d questions."
			+ "\n\tTime Duration is %d s.",this.name,this.noOfQuestions,this.expectedTime);
		var usedTime = 0;
		var myTimer = setInterval(function()
		{
			usedTime += 1;
		},1000);
		inquirer.prompt(this.questions).then(function(answers)
		{
			clearInterval(myTimer);
			var rpd = respond(objQuiz,answers,username,usedTime);
			callback();
			//return rpd;
		});
	}
	else
	{
		return false;
	}
}
function respond(quiz,answers,username,usedTime)
{
	var initialScore = 0;
	var j = 0;
	for (var i in answers)
	{
		if (answers[i] === quiz.answers[j])
		{
			initialScore ++;
		}
		j++;
	}
	var overTime = 0;
	var finalScore = initialScore;
	if (usedTime > quiz.expectedTime)
	{
		var diff = usedTime - quiz.expectedTime;
		overTime = Math.floor(diff / quiz.expectedTime) * initialScore;
		finalScore = initialScore - overTime;
		overTime = -overTime;
	}
	var quizDetail = "\n\t\t\tQuiz Details\n" +
					"\t\t Quiz Name: " + quiz.name + "\n\t\t Number of Questions: " +
					quiz.noOfQuestions + "\n\t\t Duration: " + quiz.expectedTime +
					"\n\t\t Score: " + initialScore + "\n\t\t Overtime: "  + overTime +
					"\n\t\t Final Score: " + finalScore + "\n\t\t Taken By: " + username + "\n";
	console.log(quizDetail);
	return quizDetail;
};
module.exports.Quizzes.prototype.importToLib = function(quizPath)
{
	var obj = files.getObjectFromFile(quizPath);
	if (obj === false)
	{
		return false;
	}
	else
	{
		if (obj.hasOwnProperty('name') && obj.hasOwnProperty('questions') && obj.hasOwnProperty('answers'))
		{
			var quizzes = [];
			quizzes = files.getObjectFromFile("quizzes.json");
			if (quizzes !== false)
			{
				for (var i = 0; i < quizzes.length; i++)
				{
					if (quizzes[i].name === obj.name)
					{
						return false;
					}
				}
				quizzes.push(obj);
				return files.writeObjectToFile(quizzes,"quizzes.json");
			}
		}
		else
		{
			return false;
		}
	}
}
