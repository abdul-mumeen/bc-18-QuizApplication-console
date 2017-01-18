
'use strict';

var firebase = require('firebase');
var fs = require('fs');
var path = require('path');
var jsfile = require('jsonfile');


var config = {
    apiKey: "AIzaSyBBnqAysbJFZF1m95aBIyZAwomCDORMyvs",
    authDomain: "quiz-app-7755f.firebaseapp.com",
    databaseURL: "https://quiz-app-7755f.firebaseio.com",
    storageBucket: "quiz-app-7755f.appspot.com",
    messagingSenderId: "969428290456"
  };
firebase.initializeApp(config);
var db = firebase.database();

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
      return false;
    }
  },
  getOnlineQuizzes: function()
  {
    try
    {
      var onlineQuizzes = [];
      db.ref("/quizzes").on("value",function(snap)
      {
        snap.forEach(function(snapChild){
          onlineQuizzes.push(snapChild.key);
        });
      });
      return onlineQuizzes;
    }
    catch (err)
    {
      return false;
    }
  },
  getOnlineQuiz: function(quizName)
  {
    try
    {
      var onlineQuiz = {};
      db.ref("/quizzes").on("value",function(snap)
      {
        snap.forEach(function(snapChild){
          if(snapChild.key === quizName)
          {
            omlineQuiz[snapChild.key] = snapChild.val();
            return onlineQuiz;
          }
        });
      });
      return false;
    }
    catch (err)
    {
      return false;
    }
  },
  writeObjectToFile :function(obj,fileName)
  {
    try
    {
      jsfile.writeFileSync(fileName,obj);
      return true;
    }
    catch (err)
    {
      return false;
    }
  },
  writeObjectToBase :function(obj)
  {
    try
    {
      var newQuizRef = db.ref("/quizzes").push();
      newQuizRef.set(obj);
     // db.ref("/" + dbPath + "/").set(obj);
      return true;
    }
    catch (err)
    {
      return false;
    }
  }
};