// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const { run } = require("jest");
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}':\n ${pointValue}`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let userInput = input.question();
   while (!/^[a-zA-Z\s]*$/.test(userInput)) {
      console.log("Invalid input. Please enter a word:");
      userInput = input.question();
   }
   return userInput;
};
//let userWord = initialPrompt();
//let score = oldScrabbleScorer(userWord);
//console.log(`The score for ${userWord} is:\n${score}`);

let simpleScorer = function(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints++;
   }
   return letterPoints;
   };

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U") {
         letterPoints += 3;
      } else {
         letterPoints++;
      }
   }
   return letterPoints;
   }

let scrabbleScorer = function(word) {
    word = word.toLowerCase();
    let letterPoints = 0;
    for (let i = 0; i < word.length; i++) {
      let letterScore = newPointStructure[word[i]];
      //console.log(`Points for '${word[i]}': ${letterScore}`);
         letterPoints += letterScore;
    }
    return letterPoints;
}   
const scoringAlgorithms = [ 
{name: 'simpleScorer', description: 'Each letter is worth 1 point.', scorerFunction: simpleScorer}, 
{name: 'vowelBonusScorer', description: 'Vowels are 3 pts, consonants are 1 pt.', scorerFunction: vowelBonusScorer}, 
{name: 'scrabbleScorer', description: 'The traditional scoring algorithm ', scorerFunction: scrabbleScorer}
]

function scorerPrompt() {
   let userInput;
   do {
    userInput = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system.\nEnter 0, 1, or 2: ");
  if(userInput === '0') {
     return scoringAlgorithms[0];
   } else if(userInput === '1') {
     return scoringAlgorithms[1];
   } else if(userInput === '2') {
     return scoringAlgorithms[2];
   } else {
       console.log("Invalid input. Please enter 0, 1, or 2.");
     }
   }while (true);
       return scorerPrompt();
     
}
 function transform(oldPointStructure) {
   let newPointStructure ={};
for (let pointValue in oldPointStructure) {
   for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
      let letter = oldPointStructure[pointValue][i].toLowerCase();
      newPointStructure[letter]= Number(pointValue);
    }
   }
   return newPointStructure;
}
let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let selectedScoringAlgorithm = scorerPrompt();
   console.log(`Score for ${word}:\n ${selectedScoringAlgorithm.scorerFunction(word)}`);
  }
runProgram();
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
