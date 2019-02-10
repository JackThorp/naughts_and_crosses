var expect = require('chai').expect;
var NaughtsAndCrosses = require('../src/NaughtsAndCrosses');


describe('NaughtsAndCrosses - naughts and crosses game', function() {

  it('should know first turn it naughts', function() {
    game = new NaughtsAndCrosses();
    expect(game.turn).to.equal(1);
  });

  it('should accept moves given a valid square');

  it('should return useful error messages for bad squares');

  it('should return true when move results in win');

  describe('#new_game()', function(){
    
    it('should clear the board');

    it('should keep track of player scores');

    it('should let winner go first');

  });
})
