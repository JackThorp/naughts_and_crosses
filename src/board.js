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

  this.write_square = function(row, col, symbol) {
    if (row < 0 || this.size <= row) { return false; }
    if (col < 0 || this.size <= col) { return false; }

    // Cannot write on square that's already filled.
    if (this.grid[row][col] != EMPTY) { return false; }

    // Can only write set of writable symbols
    if (!symbols.includes(symbol)) {return false; }

    return !!(this.grid[row][col] = symbol);

  }
}

module.exports = Board;
