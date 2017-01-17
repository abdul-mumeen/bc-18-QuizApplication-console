var fs = require('fs');
var path = require('path');
var jsfile = require('jsonfile');

module.exports = 
{
  getCurrentDirectoryBase : function() 
  {
    return path.basename(process.cwd());
  },

  fileExists : function(filePath) 
  {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  //This function get reads the file and return the array of quizzez
  getObjectFromFile: function(fileName)
  {
    try
    {
      return jsfile.readFileSync(fileName);
    }
    catch (err)
    {
      return err;
    }

  },
  writeOjectToFile :function(obj,fileName)
  {
    jsfile.writeFileSync(fileName,obj, function(err)
    {
      if (err)
      {
        return false;
      }
      else
      {
        return true;
      }
    });
  }
};