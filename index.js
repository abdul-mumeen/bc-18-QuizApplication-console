var files = require('../bc-18-quizapplication-console/files.js');
var qz = require('../bc-18-quizapplication-console/quizzes.js');
var obj = files.getObjectFromFile("quizzes.json");
console.log(obj[0].name);
var q = new qz.Quizzes();
q.takeQuiz("physics");