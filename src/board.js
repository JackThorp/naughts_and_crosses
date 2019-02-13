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
 
  /* Returns false if square is 0 (unmarked) or unequal to next square
   * otherwise returns value of squares.
   */ 
  function squareComp(cur_sq, nxt_sq) {
    if(cur_sq == 0 || cur_sq != nxt_sq) {
      return false;
    }
    // cur_sq == nxt_sq
    return nxt_sq;
  }

  /* Returns false if no winning line made
   * otherwise returns symbol of fist complete line found.
   *
   * Conect 4 (subsets of full lines and multiple diagonal 
   * possibities) would be interesting challenge...
   */
  this.checkWinner = function(winCB) {

    // Bool & symbol variables that track each possible win
    let row_sq, col_sq = false;
    let d1_sq = this.grid[0][0];
    let d2_sq = this.grid[0][this.size-1];

    for(let i=0; i<this.size; i++) {
      row_sq = this.grid[i][0];
      col_sq = this.grid[0][i];
      for(let j=1; j<this.size; j++){
        row_sq = squareComp(row_sq, this.grid[i][j]);
        col_sq = squareComp(col_sq, this.grid[j][i]);

        if(!row_sq) break;
        if(!col_sq) break;
      }
      
      // Return early if full row or column found.
      if(row_sq) {winCB(row_sq); return row_sq;}
      if(col_sq) {winCB(col_sq); return col_sq;}

      // No need to check diagonals if already failed.
      if((d1_sq || d2_sq) && i>0) {
        d1_sq = squareComp(d1_sq, this.grid[i][i]);
        d2_sq = squareComp(d2_sq, this.grid[i][this.size-i-1]);
      }
    }

    if(d1_sq) {winCB(d1_sq); return d1_sq};
    if(d2_sq) {winCB(d2_sq); return d2_sq};

    return false;
  }


  /*
   *
   *
   */ 
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
