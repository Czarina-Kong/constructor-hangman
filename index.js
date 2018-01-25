//Let's make some variables
var inquirer = require('inquirer')
var isLetter = require('is-letter')

var Word = require('./Word.js')
var Array = require('./Array.js')

var wordList = Array.newWord.wordList
var guessesRemaining = 10
var guessedLetters = []
var currentWord




//Let's make some functions

// function to start game
function startGame() {
    console.log('==============================')
    console.log("Let's play Hangman food edition!")
// prompt user to begin new game
    inquirer.prompt([
        {
            name: 'play',
            type: 'confirm',
            message: 'Ready to play?'
        }
    ]).then(function (answer) {
  		console.log('==============================')
        if (answer.play) {         
            console.log("You have 10 chances.  Let's get cookin!")
            playGame()
        } else {
            console.log('Awww.  Maybe next time.')
        }
    })
}

// function to play game
function playGame() {
// reset guessesRemaining and guessedLetters
	guessesRemaining=10
	guessedLetters = []
// chose random word
    currentWord = new Word(wordList[Math.floor(Math.random() * wordList.length)])
    currentWord.getLetters()
// displays current word as blank
    console.log(currentWord.wordRender())
    promptUser()
}

// function to prompt user to chose a letter
function promptUser() {
    inquirer.prompt([
        {
            name: 'chosenLetter',
            type: 'input',
            message: 'Choose a letter',
            validate: function(value) {
                if (isLetter(value)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then(function(abc) {
// turn letter into uppper case and store in variable
        var letterReturned = (abc.chosenLetter).toLowerCase()
// check to see if you guessed that letter already and set flag to false
        var guessedAlready = false
        for (var i = 0; i < guessedLetters.length; i++) {
            if(letterReturned === guessedLetters[i]) {
                guessedAlready = true
            }
        }
        if (guessedAlready === false) {
// push letter into array
            guessedLetters.push(letterReturned)
// variable to check if letter was in the word
            var found = currentWord.checkIfLetterFound(letterReturned)
            console.log('==============================')
            if (found === 0) {
                guessesRemaining--
                console.log('INCORRECT!')
                console.log(currentWord.wordRender())
                console.log('Letters guessed: ' + guessedLetters)
                console.log('Incorrect guesses remaining: ' + guessesRemaining)
            } else {
                console.log('CORRECT!')
                if (currentWord.checkWord() === true) {
                    console.log('You guessed: '+currentWord.wordRender())
                    console.log('YUM!!  BIG WINNER!!')
                    startGame()
                } else {
                    console.log(currentWord.wordRender())
                    console.log('Letters guessed: ' + guessedLetters)
                    console.log('Incorrect guesses remaining: ' + guessesRemaining)
                }
            }
// if still have guesses, promptUser()
            if (guessesRemaining > 0 && currentWord.wordFound === false) {
                promptUser();
            } else if (guessesRemaining === 0) {
// if no more guesses, you lose           
                console.log('The word you were trying to guess was: ' + currentWord.word)
                console.log('\nSORRY.  TRY AGAIN...\n')
                startGame()             
            }
        } else { 
// if previously guessed letter, promptUser()
            console.log("You've guessed that letter already, try again.")
            promptUser();
        }
    })
}




// run start game!!
startGame()