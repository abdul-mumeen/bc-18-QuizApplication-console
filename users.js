//User Object
var files = require('../bc-18-quizapplication-console/files.js');
module.exports = 
{
	 User: function (username) 
	 {
	  this.username = username; //user first name
	  this.currentScore = 0 ; //current score of the user
	}
};
module.exports.User.prototype.checkUserExist = function()
{
	var found = false;
	var users = [];
	users = files.getObjectFromFile("users.json");
	if (users !== false)
	{
		for (var i = 0; i < users.length; i++)
		{
			if (users[i].name.toLowerCase() === this.username.toLowerCase())
			{
				found = true;
				break;
			}
		}
	}
	return found;
}

module.exports.User.prototype.createUser = function()
{
	var success = false;
	var users = [];
	users = files.getObjectFromFile("users.json");
	if (users !== false)
	{
		var newUser = {
			"username": this.username
		};
		users.push(newUser);
		success = files.writeObjectToFile(users,"users.json");
	}
	return success;
}

