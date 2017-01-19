
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
  getOnlineQuizzes: function(callback)
  {
    try
    {
      var onlineQuizzes = [];
      db.ref("/quizzes/").once("value",function(snap)
      {
        snap.forEach(function(snapChild){
          onlineQuizzes.push(snapChild.key);
        });
        callback(onlineQuizzes);
      });
    }
    catch (err)
    {
      return false;
    }
  },
  getOnlineQuiz: function(quizName,callback)
  {
    try
    {
      var onlineQuiz = {};
      db.ref("/quizzes/").once("value",function(snap)
      {
        snap.forEach(function(snapChild){
          if(snapChild.key === quizName)
          {
            onlineQuiz[snapChild.key] = snapChild.val();
           // console.log(onlineQuiz);
          }
        });
        callback(onlineQuiz);
      });
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
      var key = "";
      var value = "";
      for (var i in obj)
      {
        key = i;
        value = obj[i];
      }
      var newQuizRef = db.ref("quizzes/" + key);
      newQuizRef.set(value);
     // db.ref("/" + dbPath + "/").set(obj);
      return true;
    }
    catch (err)
    {
      return false;
    }
  }
};