'use strict';

var files = require('../bc-18-quizapplication-console/files.js');
var qz = require('../bc-18-quizapplication-console/quizzes.js');
var oc = require('../bc-18-quizapplication-console/objectconverter.js');
module.exports = 
{
	getQuizzes : function()
	{
		var quizzes = files.getOnlineQuizzes();
		if (quizzes !== false && quizzes.length > 0)
		{
			var reQuizzes = "\n\t\t List of Online Quizzes \n";
			for (var i = 0; i < quizzes.length; i++)
			{
				reQuizzes += "\t\t" + quizzes[i] + "\n";
			}
			return reQuizzes;
		}
		else
		{
			return false;
		}
	},
	checkQuiz: function(quiz)
	{
		var quizzes = files.getOnlineQuizzes();
		if (quizzes !== false)
		{
			var found = false;
			for (var i = 0; i < quizzes.length; i++)
			{
				if(quizzes[i] === quiz)
				{
					return true;
				}
			}
			return found;
		}
		else
		{
			return false;
		}
	},

	downloadQuiz: function(quizName)
	{
		if (module.exports.checkQuiz(quizName))
		{
			var objQuiz = files.getOnlineQuiz(quizName);
			if (!objQuiz)
			{
				return false;
			}
			else
			{
				var quizWrite = new qz.Quizzes();
				return quizWrite.importToLib(oc.ConvertOnlineObjectToLocal(objQuiz),true);
			}
		}
		else
		{
			return false;
		}
	},
	uploadQuiz: function(quizName)
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
					return (files.writeObjectToBase(oc.ConvertLocalObjectToOnline(quizzes[i])));
				}
			}
			return false;
		}
		else
		{
			return false;
		}
	}

};