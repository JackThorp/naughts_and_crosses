function Board() {

  // board square can have three values.
  const EMPTY   = 0;
  const NAUGHT  = 1;
  const CROSS   = 2;

  // set of writable symbols
  const symbols  = [NAUGHT, CROSS];

  this.size = 3;

  this.grid = new Array(this.size).fill(EMPTY);

  for(var i=0; i<this.size; i++) {
    this.grid[i] = new Array(this.size).fill(EMPTY);
  }

  this.read_square = function(row, col) {
    return this.grid[row][col];
  }

  // Could possibly hide idea of row and column within this class i.e. all grid spaces numbered
  // to keep this simpler. 
  this.write_square = function(row, col, symbol) {
    if (row < 0 || this.size <= row || col < 0 || this.size <= col) { 
      throw Error('grid coordinates are out of bounds. Grid size = ' + this.size ); 
    }

    // Cannot write on square that's already filled.
    if (this.grid[row][col] != EMPTY) { return false; }

    // Can only write set of writable symbols
    if (!symbols.includes(symbol)) { 
      throw Error('Invalid symbol! ' + symbol + ' is not recognised by this board.'); 
    }

    return !!(this.grid[row][col] = symbol);

  }
  
  this.checkWinner = function() {

    // Check rows
    for(let i=0; i<this.size; i++) {
      winner = this.grid[i][0];
      for(let j=1; j<this.size; j++){
        if(winner == 0 || winner != this.grid[i][j]) {
          winner = false; 
          break;
        }
      }
      
      if(winner) {return winner};
    }

    // Check cols
    for(let j=0; j<this.size; j++) {
      winner = this.grid[0][j];
      for(let i=1; i<this.size; i++) {
        if(winner == 0 || winner != this.grid[i][j]) {
          winner = false;
          break;
        }
      }
      if(winner) {return winner};
    }

    // Check diagonals
    let i = 0;
    let d1 = this.grid[i][i];
    let d2 = this.grid[i][this.size-1-i];

    for(i=1; i<this.size; i++) {  
      if(d1 == 0 || d1 != this.grid[i][i]) {d1 = false};
      if(d2 == 0 || d2 != this.grid[i][this.size-i]) {d2 = false};
      if(!(d1 || d2)) {return false};
    } 
    
    if(d1) return d1;
    if(d2) return d2;

    return false;
  }

  this.print = function() {
    
    for(let i = 0; i < this.size - 1; i++) {
      let row = " ";
      for(let j = 0; j < this.size - 1; j++) { 
        row += this.grid[i][j] + " | ";
      }
      console.log(row + this.grid[i][this.size-1]);
      console.log("-".repeat((this.size * 3) + this.size - 1));
    }

    let row = " ";
    for(let j = 0; j < this.size - 1; j++) { 
        row += this.grid[this.size-1][j] + " | ";
    }
    console.log(row + this.grid[this.size-1][this.size-1]);
  }

}

module.exports = Board;
