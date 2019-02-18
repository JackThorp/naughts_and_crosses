const NaughtsAndCrosses = require('./NaughtsAndCrosses');
const readline = require('readline');


console.log("Welcome to Terminal Crosses");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var gameWon = false;
var winner  = 0;

let game = new NaughtsAndCrosses(function(winner) {
  gameWon = true;
  winner = winner;
}); 

do {
  game.print();
  rl.question('Player ' + game.nextTurn() + ' what is your move?', (answer) => {
    game.go(answer);
  });
} while (!gameWon);

console.log("congratulations " + winner + " - see ya!");
