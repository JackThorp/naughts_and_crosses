var expect = require('chai').expect;
var NaughtsAndCrosses = require('../src/NaughtsAndCrosses');


describe('NaughtsAndCrosses - naughts and crosses game', function() {

  // is this a code smell?
  let game = new NaughtsAndCrosses();

  beforeEach(function(){
    game = new NaughtsAndCrosses();
  })
  // For now first turn of new game defaults to naught.
  it('should toggle turns starting with naughts == 1', function() {
    expect(game.nextTurn()).to.equal(1);
    game.go(1);
    expect(game.nextTurn()).to.equal(2);
    game.go(4);
    expect(game.nextTurn()).to.equal(1);
  });

  // Squares are numbered from 1 - gridsize x gridsize
  it('should throw Error and not accept a square if out of range', function() {
    // expect must be passed a function - not a result in order to test for exception
    expect(game.go.bind(game, 0)).to.throw(Error);    
    expect(game.go.bind(game,10)).to.throw(Error);
  });

  it('should return true when move is accepted', function() {
    expect(game.go(1)).to.equal(true);
    expect(game.go(6)).to.equal(true);
    expect(game.go(9)).to.equal(true);
  });

  it('should return false if square is already occupied', function() {
    game.go(4);
    expect(game.go(4)).to.equal(false);
  });


  describe('#new_game()', function(){
    
    it('should clear the board');

    it('should keep track of player scores');

    it('should let winner go first');

  });
})
