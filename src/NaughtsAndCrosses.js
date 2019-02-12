var Board = require('./board');

function NaughtsAndCrosses() {

  // Better way to use symbol mapping??
  var turn = 2;
  this.grid = new Board();

  this.go = function(square) {
   
    if (square <= 0 || this.grid.size**2 < square) { 
      throw new Error("Chosen square is outside board range")
    };

    let _square = square - 1;
    let size = this.grid.size;
    let row = Math.floor(_square / size);
    let col = _square % size;
    
    turn = this.nextTurn();

    return this.grid.write_square(row, col, turn); 
    

  }

  // A getter that returns the symbol or ID of the next player - has no side effects. 
  this.nextTurn = function() {
    let _turn = turn - 1;
    return (_turn * -_turn) + 2;
  }

}

module.exports = NaughtsAndCrosses;
