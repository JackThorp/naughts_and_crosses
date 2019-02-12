var Board = require('../src/board');
var expect = require('chai').expect;

describe('board', function() {

  context('constructed without parameters', function() {

    var board;
    const NAUGHT  = 1, CROSS   = 2;

    beforeEach(function(){
      board = new Board();
    });

    it('should have size 3', function() {
      expect(board.size).to.equal(3);
    })

    describe('#read_square(...)', function() {
      it('should return 0 for every square', function(){
        for(var i=0; i<board.size; i++){
          for(var j=0; j<board.size; j++){
            expect(board.read_square(i,j)).to.equal(0);
          }
        }        
      })
    })

    describe('#write_square(...)', function() {
      it('should throw Error if indicies out of grid boundaries', function() {
        expect(board.write_square.bind(board, 3, 1, CROSS)).to.throw('out of bounds');
      });
      
      it('should write a symbol to the board and return true', function() {
        var row = 0, col = 2;
        
        expect(board.write_square(row, col, NAUGHT)).to.equal(true);
        expect(board.read_square(row, col)).to.equal(NAUGHT);

        expect(board.write_square(col, row, CROSS)).to.equal(true);
        expect(board.read_square(col, row)).to.equal(CROSS);

      });

      it('should return false if symbol already written', function(){
        var row = 1, col = 1;
        board.write_square(row, col, NAUGHT);
        expect(board.write_square(row, col, CROSS)).to.equal(false);
      });

      it('should only accept 1 or 2 as symbol and throw error otherwise', function() {
        expect(board.write_square.bind(board, 1, 1, 3)).to.throw('Invalid symbol');
        expect(board.write_square.bind(board, 1, 1, -1)).to.throw('Invalid symbol');
        expect(board.write_square.bind(board, 1, 1, 0)).to.throw('Invalid symbol');
      });

    })
    
    describe('#checkWinner()', function() {
      it('should return the symbol if a player has made a full row', function() {
        board.write_square(0,0,2);
        board.write_square(0,1,2);
        board.write_square(0,2,2);
        expect(board.checkWinner()).to.equal(2);
       
        board = new Board();
        board.write_square(2,0,1);
        board.write_square(2,1,1);
        board.write_square(2,2,1);
        expect(board.checkWinner()).to.equal(1);
      });

      it('should return the symbol if a player has made a full column', function() {
        board.write_square(0,0,2);
        board.write_square(1,0,2);
        board.write_square(2,0,2);
        expect(board.checkWinner()).to.equal(2);
        
        board = new Board();
        board.write_square(0,1,1);
        board.write_square(1,1,1);
        board.write_square(2,1,1);
        expect(board.checkWinner()).to.equal(1);
      });

      it('should return symbol if a player has completed a full diaganol', function() {
        board.write_square(0,0,1);
        board.write_square(1,1,1);
        board.write_square(2,2,1);
        expect(board.checkWinner()).to.equal(1); 
        
        board.write_square(0,2,2);
        board.write_square(1,1,2);
        board.write_square(2,0,2);
        expect(board.checkWinner()).to.equal(1); 
      })

      it('should return false if no player has won', function() {
        expect(board.checkWinner()).to.equal(false);
        board.write_square(0,0,1);
        board.write_square(1,0,2);
        expect(board.checkWinner()).to.equal(false);
      });
    
    })
  })
})

