'use strict';

var files = require('../bc-18-quizapplication-console/files.js');
var qz = require('../bc-18-quizapplication-console/quizzes.js');
var oc = require('../bc-18-quizapplication-console/objectconverter.js');
module.exports = 
{
	getQuizzes : function(callback)
	{
		files.getOnlineQuizzes(function(quizzes)
			{
				if (quizzes !== false && quizzes.length > 0)
				{
					var reQuizzes = "\n\t\t List of Online Quizzes \n";
					for (var i = 0; i < quizzes.length; i++)
					{
						reQuizzes += "\t\t" + quizzes[i] + "\n";
					}
					callback(reQuizzes);
				}
				else
				{
					callback(false);
				}
			});
	},
	checkQuiz: function(quiz,callback)
	{
		files.getOnlineQuizzes(function(quizzes)
			{
				var found = false;
				if (quizzes !== undefined)
				{									
					for (var i = 0; i < quizzes.length; i++)
					{
						if(quizzes[i] === quiz)
						{
							found = true;
							break;
						}
					}
				}
				else
				{
					found = false;
				}
				callback(found);
			});
	},

	downloadQuiz: function(quizName,callback)
	{
		module.exports.checkQuiz(quizName,function(found)
		{
			if (found)
			{
				files.getOnlineQuiz(quizName,function(objQuiz)
					{
						var downloaded = false;
						if (objQuiz)						
						{
							var quizWrite = new qz.Quizzes();
							downloaded = quizWrite.importToLib(oc.ConvertOnlineObjectToLocal(objQuiz),true);
						}
						callback(downloaded);
					});
			}
			else
			{
				return false;
			}
		});
	},
	uploadQuiz: function(quizName, callback)
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
					module.exports.checkQuiz(quizName,function(found)
						{
							if (!found)
							{							
								var onlineObj = oc.ConvertLocalObjectToOnline(quizzes[i]);
								callback(files.writeObjectToBase(onlineObj));								
							}
							else
							{
								callback(false);
							}
						});
					break;
				}
			}
		}
		else
		{
			return false;
		}
	}

};