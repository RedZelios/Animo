var float, fall;
var pos = 0;
const FALL_DISTANCE = 60;
const MAX_HEIGHT = 450;
const UP_SPEED = 20;//smaller = faster
const DOWN_SPEED = 15;//smaller = faster

var mathQuestion = {
	operator:'',
	x:0,
	y:0,
	answer:0,
}

function gameTwoLoad(){	
	document.getElementById(`game_container`).style.backgroundImage ="url(../img/game2Background.gif)"
	document.getElementById(`overlay2`).style.marginTop = "-590px";
	document.getElementById(`gameContainer2`).style.marginTop = "-590px";	
	document.getElementById("moveBalloon").style.transform="translateY(200px)"; 
	newMathQuestion();
}

function gameTwoReset(){
	document.getElementById(`overlay2`).style.display = "block";
	document.getElementById(`gameContainer2`).style.display = "none";
	document.getElementById(`game_container`).style.backgroundImage ="url(../img/background_waterfall.gif)"
	balloonReset();
}

function offOverlay2(){
	document.getElementById(`overlay2`).style.display = "none";
	document.getElementById(`gameContainer2`).style.display = "block";
	document.getElementById("containerBalloon").style.display = "block"; 
}

//Question Logic----------------------------------------------------------------------
function newMathQuestion(){
	var question = generateMathQuestion();
	injectMathQuestion(question);
}

function injectMathQuestion(question){
	document.getElementById(`mathX`).innerHTML = question.x;
	document.getElementById(`mathYO`).innerHTML = `${question.y}${question.operator}`;
}

function generateMathQuestion(){
	var question = mathQuestion;

	question.x =  Math.floor(Math.random() * Math.floor(10));
	question.y =  Math.floor(Math.random() * Math.floor(10));
	if(question.x<question.y) {
		var tmp;
		tmp = question.y, question.y = question.x, question.x = tmp;
	}
	var i =  Math.floor(Math.random() * Math.floor(2));
	switch(i){
		case 0:
			question.operator='+';
			question.answer = question.x + question.y;
			break;
		case 1:
			question.operator='-';			
			question.answer = question.x - question.y;
			break;
	}
	console.log(question);
	mathQuestion = question;
	return question;
}

function checkMathAnswer(){
	var question = mathQuestion;
	var userAnswer = document.getElementById("userMathAnswer").value;
	document.getElementById("userMathAnswer").value ='';
	if(userAnswer==question.answer) balloonFall();
	return false;
}
//Balloon Logic----------------------------------------------------------------------
function balloonReset(){	
	pos = 0;
	document.getElementById("moveBalloon").style.top = pos + 'px';
	newMathQuestion();
}

function balloonStop() {
	clearInterval(float);
	clearInterval(fall);
}

function balloonFloat() {		
	balloonStop();
	float = setInterval(upAnimation, UP_SPEED);	
}

function balloonFall(){
	newMathQuestion();
	balloonStop();
	var i = 0;
	fall = setInterval(function(){
		i++;
		downAnimation(i);
	}, DOWN_SPEED);
}

function downAnimation(i){
	
	if (i > FALL_DISTANCE) {
		balloonStop();
		balloonFloat();
	} 
	else{
		pos++;
		document.getElementById("moveBalloon").style.top = pos + 'px';
	}
}

function upAnimation() {	
	if (pos < -MAX_HEIGHT) {
		balloonStop();
		balloonReset();
	} 
	else{
		pos--; 
		document.getElementById("moveBalloon").style.top = pos + 'px'; 
	}
}