var autobots = ['OPTIMUS', 'BUMBLEBEE', 'RATCHET', 'JAZZ', 'CLIFFJUMPER', 'WHEELJACK', 'PROWL', 
				'SIDESWIPE', 'IRONHIDE', 'MIRAGE', 'SUNSTREAKER', 'TRAILBLAZER', 'HOUND', 
				'BLUESTREAK', 'SMOKESCREEN', 'JETFIRE', 'GRIMLOCK', 'SLAG', 'SLUDGE', 'SWOOP'];  
				// 20 entries

var decepticons = ['MEGATRON', 'STARSCREAM', 'SOUNDWAVE', 'SHOCKWAVE', 'RAVAGE', 'LASERBEAK', 
				   'RUMBLE', 'THUNDERCRACKER', 'SHRAPNEL', 'BOMBSHELL', 'KICKBACK', 'HOOK', 
				   'SCRAPPER', 'BONECRUSHER', 'SCAVENGER', 'MIXMASTER', 'DEVASTATOR', 'DIRGE', 
				   'RAMJET', 'GALVATRON'];	// 20 entries -- why are most of these so forgettable?

var wins = 0;
var guesses = 12;
var sentence = "";
var transformer = "";
var answer = [];
var counter = 0;

function selectTransformer(){  // Autobots or Decepticons
    var selection = Math.round(Math.random());
    if (selection == 0) {	
    	transformer = decepticons[Math.floor(Math.random() * decepticons.length)];
    }

    else {
    	transformer = autobots[Math.floor(Math.random() * autobots.length)];
    }
}

function populate(){
    answer = [];
    for(var i = 0; i < transformer.length; i++){ 	// populate answer with underscore
    	answer[i] = "_";
    }
}

function showImage(){
      document.getElementById("stats").src = "assets/images/" + transformer.toLowerCase() + ".jpg";
}

function showBlank(){
    document.getElementById("stats").src = "assets/images/black.jpg";
}

function showDefeat(){
    document.getElementById("stats").src = "assets/images/defeat.jpg";
}

function startDrag(e) {
    // determine event object
    if (!e) {
        var e = window.event;
    }

    // IE uses srcElement, others use target
    var targ = e.target ? e.target : e.srcElement;

    if (targ.className != 'dragme') {return};
    // calculate event X, Y coordinates
        offsetX = e.clientX;
        offsetY = e.clientY;

    // assign default values for top and left properties
    if(!targ.style.left) { targ.style.left='0px'};
    if (!targ.style.top) { targ.style.top='0px'};

    // calculate integer values for top and left 
    // properties
    coordX = parseInt(targ.style.left);
    coordY = parseInt(targ.style.top);
    drag = true;

    // move div element
    document.onmousemove=dragDiv;
    return false;

}
function dragDiv(e) {
    if (!drag) {return};
    if (!e) { var e= window.event};
    var targ=e.target?e.target:e.srcElement;
    // move div element
    targ.style.left=coordX+e.clientX-offsetX+'px';
    targ.style.top=coordY+e.clientY-offsetY+'px';
    return false;
}
function stopDrag() {
    drag=false;
}

window.onload = function() {
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}

selectTransformer();
populate();

document.querySelector("#wins").innerHTML = "Wins: " + wins;
document.querySelector("#guesses").innerHTML = "Guesses left: " + guesses;
document.querySelector("#sentence").innerHTML = "Guesses so far: " + sentence;
document.querySelector("#answer").innerHTML = answer.join(" "); // replace commas with spaces 
document.querySelector("#message").innerHTML = "";

var letterChoice = new Audio("assets/audio/transforming.mp3");
letterChoice.volume = 0.2;
var correctAnswer = new Audio("assets/audio/scene_switch.mp3");
correctAnswer.volume = 0.2;
var wrongAnswer = new Audio("assets/audio/wrongAnswer.mp3");
wrongAnswer.volume = 0.2;
var bumblebee = new Audio("assets/audio/bumblebee.wav");
bumblebee.volume = 0.2;
var optimus = new Audio("assets/audio/optimus.wav");
optimus.volume = 0.2;

document.onkeypress = function(event){
    showBlank();
    document.getElementById("draggable").style.visibility = 'hidden';
    document.querySelector("#message").innerHTML = "";
    document.querySelector("#message2").innerHTML = "";
    document.querySelector("#head").innerHTML = "Press any key to begin!";
    var userGuess = event.key.toUpperCase();

    var repeat = false;	// keeps track of previous guesses
    for(var i = 0; i < sentence.length; i++){
    	if(userGuess == sentence[i]){
    		repeat = true;
    		break;
    	}
    }

    if(userGuess.match(/[A-Z]/i) && repeat == false && guesses > 0){ // keeps eliminates previous guesses, numbers and punctuation
        //letterChoice.play();
        sentence += (userGuess + " ");
        guesses--;

        for(var i = 0; i < transformer.length; i++){
            if(userGuess == transformer[i]){
                answer[i] = transformer[i];
                counter++;
            }
        }

        if(counter == transformer.length){
            wins++;
            showImage();
            document.getElementById("draggable").style.visibility = 'visible';
            
            if(transformer == "BUMBLEBEE"){
                bumblebee.play();
            }

            else if(transformer == "OPTIMUS"){
                optimus.play();
            }
            else {
                correctAnswer.play();
            }

            document.querySelector("#guesses").innerHTML = "Guesses left: " + guesses;
            document.querySelector("#sentence").innerHTML = "Guesses so far: " + sentence;
            document.querySelector("#answer").innerHTML = answer.join(" ");     // replace commas with spaces 
            document.querySelector("#message").innerHTML = "Congratulations! The answer was " + transformer + ".";
            document.querySelector("#message2").innerHTML = "Choose another letter to continue!";
            document.querySelector("#head").innerHTML = "See the stats by moving the secret decoder film over them!";
            document.querySelector("#wins").innerHTML = "Wins: " + wins;
            guesses = 12;
            sentence = "";
            counter = 0;
            selectTransformer();
            populate();
            return;
        }


        if(counter != transformer.length && guesses == 0){
            showDefeat();
            if(transformer == "BUMBLEBEE"){
                bumblebee.play();
            }
            else {
                wrongAnswer.play();
            }

            document.querySelector("#guesses").innerHTML = "Guesses left: " + guesses;
            document.querySelector("#sentence").innerHTML = "Guesses so far: " + sentence;
            document.querySelector("#answer").innerHTML = answer.join(" ");     // replace commas with spaces 
            document.querySelector("#message").innerHTML = "Sorry! The answer was " + transformer + ".";
            document.querySelector("#message2").innerHTML = "Choose another letter to continue!";
    
            guesses = 12;
            sentence = "";
            counter = 0;
            selectTransformer();
            populate();
            return;
        }

        else {
            document.querySelector("#guesses").innerHTML = "Guesses left: " + guesses;
            document.querySelector("#sentence").innerHTML = "Guesses so far: " + sentence;
            document.querySelector("#answer").innerHTML = answer.join(" ");     // replace commas with spaces
        } 
           
    }

    else {
    	document.querySelector("#message").innerHTML = "Non-alphabetic or redundant character. Please try again!";
    	return;
    }
}   