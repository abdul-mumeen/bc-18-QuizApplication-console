#A-Quiz
##Introduction
* **A-Quiz** is a console quiz application powered by javascript.
* It has the following features;
	* Allows taking a quiz.
		* A user supply a username before taking a quiz.
		* A user can select a quiz from of liat of quizzes available locally.
	* Allows users to view quizzes available both locally and online.
	* Allows users to import quiz from a JSON file into the local storage.
	* Allows users to download quizzes from the online repository to the local storage.
	* Allows users to publish quizzes available locally to the online repository.
* Go to [A-Quiz](https://github.com/phabbs/bc-18-QuizApplication-console} download the app.
##Dependencies
* This app functionality depends on multiple Javascript packages including;
	* **[Vorpal]**(http://vorpal.js.org/) - This framework is used to engage users in a rich and interactive environment. It is used for commands and options, persistent command history and automated help pages.
	* **[Inquirer]**(https://www.npmjs.com/package/inquirer-test) - This is a powerful toolkit used in providing easily embedded questions to users. It is the sole package used in prompting for the quiz's questions.
	* **[Figlet]** {https://www.npmjs.com/package/figlet} - As it is popularly known as font master. The figlet package is used for creating ASCII art from text.
	* **[Chalk]** (https://www.npmjs.com/package/chalk) - This is a package used in doing termminal style the right way. It is becoming popular because of it's expressive API, clean and focus and high performance.
	* **[Jsfile]** (https://www.npmjs.com/package/jsfile) - This is a javaScript library for working with files in browser.
	* **[Firebase]** (https://firebase.google.com/) - It presents tools and infrastructure you need to build better apps and grow successful businesses.

##Installation and setup

	* Navigate to a directory of choice on terminal.
	* Clone this repository on that directory.

* Using SSH;

git https://github.com/phabbs/bc-18-QuizApplication-console

* Install the app's dependencies. For best results, using a virtual environment is recommended.
		pip install -r requirements
* Install the app's database. Firebase was used for development.

##Run the app

node index.js
