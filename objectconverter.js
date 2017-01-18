'use strict';
module.exports = 
{
	ConvertOnlineObjectToLocal : function(onlineObject)
	{
		var nObj = {};
		var nam = "";
		for (var i in onlineObject)
		{
		  nObj = onlineObject[i];
		  nam = i;
		}
		nObj.name = nam;
		return nObj;
	},
	ConvertLocalObjectToOnline : function(localObject)
	{
		var names = localObject.name;
		delete localObject.name;
		var nObj = {};
		nObj[names] = localObject;
		return nObj;
	}
}

