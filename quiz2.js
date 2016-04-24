var Question = require('./question.js');
var Read = require('read');
var User = require('./user.js');
var jsonfile = require('jsonfile');
var file = './JSON';


var Quiz = function(questions){
	this.questions = questions;
	this.question_number = 0;
	this.score = 0;
}

Quiz.prototype.start = function(){
	
	console.log("###########################");
	console.log("Hi! Welcome to our Game!!!!");
	console.log("###########################");
	this.askQuestion(this);
	
}

Quiz.prototype.bonus_question = function(instance){
		console.log("Bonus Question 2 Points!!!!!!");
 		instance.askRandomQuestion(instance);
}

Quiz.prototype.nextQuestion =function(instance){
	console.log("#################################");
	if (instance.question_number < 2){
		console.log("<--------Next Question------->");
		instance.question_number += 1;
		instance.askQuestion(instance);
	}else if (instance.question_number == 2){
		console.log	("por aqui!!!!!!!");
		instance.bonus_question(instance);
		
	}else{
		console.log("#####################");
		console.log("Game Finished!!!!!!");
		console.log("Your score is: " + instance.score);
		console.log("#####################");
	}
}

Quiz.prototype.askRandomQuestion = function(x){

	var randomnumber = Math.floor(Math.random()*3);
	console.log(randomnumber);
	options = {
				prompt: x.questions[randomnumber].question
			}
			read(options, function(err, response){
					x.question_number = 4;
					var result = x.check(response, x.questions[randomnumber].answer);
					if (result == false){
						console.log("Correct Answer: " + x.questions[randomnumber].answer);
						x.nextQuestion(x);
					} else{
						console.log(response);
						x.score += 2;
						x.nextQuestion(x);	
					}
			});	
 
}

Quiz.prototype.askQuestion = function(x){
	
			options = {
				prompt: x.questions[x.question_number].question
			}
			read(options, function(err, response){
					if(response.toUpperCase() == "SAVE"){
						console.log("Game saved!");
						console.log("Bye");
						x.save();
					}
					x.actualResponse = response;
					x.actualRealResponse = x.questions[x.question_number].answer;
					var result = x.check(response, x.questions[x.question_number].answer);
					if (result == false){
						console.log("Correct Answer: " + x.questions[x.question_number].answer);
						x.nextQuestion(x);
					} else{
						console.log(response);
						x.score += 1;
						x.nextQuestion(x);	
					}
			});	
}

Quiz.prototype.check = function(actualResponse, actualRealResponse){
	
	if(actualResponse.toUpperCase() == actualRealResponse.toUpperCase()){
		console.log("Correct!!!!!!");
		return true;
	} else {
		console.log("Incorrect!!!!!!");
		return false;
	}
}

Quiz.prototype.save = function(){

	jsonfile.writeFile(file, this, function (err) {
            console.log(err);
        });

}
q1 = new Question("What's the name of Sepultura's lead guitar?", "Andreas Kisser", 0);
q2 = new Question("Who was the lead singer in Motorhead?", "Lemmy Kilmister", 1);
q3 = new Question("What's the name of last Non Servium record?" , "Resurgir", 2);

questionsArray = [q1,q2,q3];
quiz = new Quiz(questionsArray);

user = new User(quiz);

user.start(user);