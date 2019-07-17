var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;


// if we click on the start / reset button
	// get the button id
	document.getElementById('startreset').onclick=function(){
		//console.log('clicked');
		// if we are playing	
		if(playing == true){
			location.reload(); //reload page
		}else{ // if we are not playing
			// playin mode
			playing = true;
			score = 0; 
			//set the score 0
			document.getElementById("scorevalue").innerHTML = score;

			//show the countdown box
			show('timeremaining');
			//set timeremaining to 60sec 
			timeremaining = 60; //default value
			document.getElementById("timeremainingvalue").innerHTML = timeremaining;

			//hide the game over block
			hide('gameOver');
			// change button text to reset
			document.getElementById('startreset').innerHTML = "Reset Game";

			startCountdown();//calling startCountdown function which reduce the timeremaining value of 60 sec by 1

			//generate new questions & answers
			generateQA();
			
		}

	}
// if we are playing
// reload page
// if we are not playing
// set score to 0
// show countdown box
// reduce time by 1sec in loops
// timeleft?
// yes->continue
// no->game over
// change button text to reset
// generate new questions & answers

// if we click on answer box 
// if we are playing
	//correct?
		// yes
		// increase score
		// show correct box for 1sec
		// generate new questions & answers
		// no
		// show try again box for 1sec


/********************functions *****************/

// clicking on an answer box
for(i=1; i<5; i++){
	document.getElementById("box"+i).onclick = function(){
		//check if we are playing
		if(playing == true){ //yes
			if(this.innerHTML == correctAnswer){
				//if it is correct answer
				score++;
				document.getElementById("scorevalue").innerHTML = score;

				//hide worng box
				hide('wrong');
				show('correct');
				//after 2 seconds the correct text will hide
				setInterval(function(){
					hide('correct');
				}, 2000);

				//generate new questions & answers
				generateQA();
			}else{
				//wrong answer
				//hide worng box
				hide('correct');
				show('wrong');
				//after 2 seconds the correct text will hide
				setInterval(function(){
					hide('wrong');
				}, 2000);
			}
		}	
	}

}
// function counter
function startCountdown(){
	//setInterval has 2 parameters; 1 is function and the 2 is timing; hear i set 1sec
	action = setInterval(function(){
		timeremaining -= 1; // reducing this value by 1
		document.getElementById("timeremainingvalue").innerHTML = timeremaining;
		if(timeremaining == 0){ //game over
			clearInterval(action);
			//alert("gameover");
			//show gameover div with the text message
			show('gameOver');
			document.getElementById('gameOver').innerHTML = "<p>game over!</p><p>Your score is " + score + "</p>"
			//set countdown block to none
			//document.getElementById('timeremaining').style.display="none"; or
			hide('timeremaining');
			hide('correct');//set display none correct div
			hide('wrong');
			playing = false; //set playing mode to false
			// change button text to start
			document.getElementById('startreset').innerHTML = "Start Game";
		}
	}, 1000)
}

//hide display
function hide(id){
	document.getElementById(id).style.display="none";
}

//show display
function show(id){
	document.getElementById(id).style.display="block";
}


//generate new questions & answers that is multiplication number
function generateQA(){
	//Math.random function return 0 to .99, so we multiply by 9 and add to 1 so that there should not be a 0
	var x = 1 + Math.round(9 * Math.random()); //number between 1 to 10
	var y = 1 + Math.round(9 * Math.random());
	//console.log(x);
	//console.log(y);
	correctAnswer = x * y;
	//console.log(correctAnswer);

	//set the x and y value in question div block
	document.getElementById('question').innerHTML = x + "x" + y;	

	//set the correct answer in the one box among 4
	var correctPosition = 1 + Math.round(3 * Math.random());
	//console.log('correct position '+correctPosition);
	document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer


	//fill other boxes with wrong answers
	var answers = [correctAnswer];

	for(i=1; i<5; i++){
		if (i != correctPosition){
			var worngAnswer;
			do{
				worngAnswer = 1 + Math.round(9 * Math.random()) * 1 + Math.round(9 * Math.random());//wrong answer	
			}while(answers.indexOf(worngAnswer) > -1)
			
			document.getElementById("box"+i).innerHTML = worngAnswer; //fill one box with the correct answer
				answers.push(worngAnswer);

		}
	}
}


//generateQA()