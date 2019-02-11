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
    
    this.nextTurn();
    console.log("row:" + row + "  col:" + col + "  turn:" + turn);

    return this.grid.write_square(row, col, turn); 
    

  }

  // turn (captured by closure is 1 or 2. 
  // _turn is either 0 or 1 to aid calculation
  this.nextTurn = function() {
    let _turn = turn - 1;
    return turn = (_turn * -_turn) + 2;
  }

}

module.exports = NaughtsAndCrosses;
