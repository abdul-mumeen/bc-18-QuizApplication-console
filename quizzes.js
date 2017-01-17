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

module.exports.Quizzes.prototype.takeQuiz = function(quizName)
{
	var found = this.findQuiz(quizName);
	if (found)
	{
		var objQuiz = this;
		inquirer.prompt(this.questions).then(function(answers)
		{
			if (answers)
			{
				respond(objQuiz,answers);
			}
		});
	}
	else
	{
		console.log("Quiz not found ");
	}
}
function respond(quiz,answers)
{
	var score = 0;
	var j = 0;
	for (var i in answers)
	{
		if (answers[i] === quiz.answers[j])
		{
			score ++;
		}
		j++;
	}
	return score;
};