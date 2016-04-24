read = require('read');

var User = function(quiz){
	this.name = "antonio";
	this.userScore = 0;
	this.quiz = quiz;
}

User.prototype.start = function(user){

	options = {
		prompt: "New User?Y or N\n"
	}

	read(options, function(err, response){
		console.log(response);
		 if (response.toUpperCase() == "Y"){
		 	user.register(this);
		 } else if (response.toUpperCase() == "N"){
		 	user.login(this);
		 } else if ((response.toUpperCase() != "Y") || (response.toUpperCase() != "N") ){
		 	console.log("Monger type Y or N");
		 	user.start(this);
		 }
	});
}

User.prototype.register = function(user){
	
	options = {
		prompt: "What's your name?\n"
	}

	read(options,function(err,response){
		console.log("Welcome: " + response);
		quiz.start(this);
	});
}

User.prototype.login = function(user){
	options = {
		prompt: "Type your name: \n"
	}

	read(options, function(err, response){
		console.log("Welcome: " + response);
		quiz.start(this);
	});
}

module.exports = User;