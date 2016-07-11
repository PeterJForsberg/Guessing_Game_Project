/* **** Guessing Game Functions **** */

var allowedGuesses = 6;


// Generate the Winning Number, a random number between 1 and 100; 

function generateWinningNumber(){
	var winNum = Math.floor(Math.random()*100) + 1;
	return winNum
}

// Fetch the Players Guess -- after this number is taken, the "guess submission" set back to a non-relevant value (-1);

function playersGuessSubmission(){
	var playersGuess = Number(playersGuess);
	document.getElementById("guess submission").value = -1;
});

// Determine if the next guess should be a lower or higher number 
//return language that will help clue a player into whether or not they are close

function lowerOrHigher(){
	if (Math.abs(playersGuess - winNum) < 10) {
		status0 = "Nice work - you're getting hot";
	} else if (Math.abs(playersGuess - winNum) < 20) {
		status0 = "Warm...."
	} else {
		status0 = "Cold."
	};
	return status0;
}

// Check if the Player's Guess is the winning number, return them a message
// Keep a tally of how many guesses they have made, allowing them max 6 guesses
// Be ready for one of four conditions which will impact message: 
// 1) correct guess -- triggers play again function
// 2) incorrect guess -- no more guesses
// 3) incorrect guess -- more guesses remain
// 4) duplicate guess

function checkGuess(){
	var totalGuesses = 0;
	var status = "";
	var guessesSoFar = [];
	if (playersGuess === winningNumber) {
		var status = "Congrats, you win!";
		playAgain();
	} else if (totalGuesses === 6) { 
		var status = "Unfortunately, you've run out of a guesses."
	} else if (guessesSoFar.indexOf(playersGuess) === -1) {
		var allowedGuesses -= 1;
		var status = "You have " allowedGuesses " more attempts.";
		var totalGuesses += 1;
		guessesSoFar.push(playersGuess); 
	} else {
		var status = "Duplicate guess - please try again.";
	};
	guessMessage();
};

// Provide a message to the player - a function automatically resulting from the "checkguess" function, 
// either tell them they win or else use the lowerOrHigher function to return a clue along with success message, 
// regardless of whether they ask for it. 

function guessMessage(){
 	lowerOrHigher();
 	if (status === "Congrats, you win!") {
 		var message = status;
 	} else {
 		var message = status0 + " " + status;
 	}
 	return message;
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var hint = winNum;
	var hintReturn = "You should try harder next time -- but if you must, guess: " hint;
	return hintReturn;
}

// Allow the "Player" to Play Again -- activate a new "Winning number" whenever they click the restart button or when they win a game

function playAgain(){
	generateWinningNumber();
}

/* **** Event Listeners/Handlers ****  */
// when the page is ready, start by generating a winning number and providing a starting guess that is not correct; 
// then take a players guess based on interaction (what they submit into the text field)
// after that, execute the 

$(document).ready(function() {
	generateWinningNumber();
	var playersGuess = -1; 
	$('submit').on('click', function() {
		var playersGuess = document.getElementById("guess submission").value;
		checkGuess();
	}); 
	$('#help').on('click', function() {
		provideHint();
	}); 
	$('#restart').on('click', function() {
		playAgain();
	});
};
