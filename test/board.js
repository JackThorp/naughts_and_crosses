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
      it('should return undefined if indicies out of grid boundaries', function() {
        expect(board.write_square(3,1, CROSS)).to.be.an('undefined');
      });
      
      it('should write a symbol to the board and return symbol value', function() {
        var row = 0, col = 2;
        
        expect(board.write_square(row, col, NAUGHT)).to.equal(NAUGHT);
        expect(board.read_square(row, col)).to.equal(NAUGHT);

        expect(board.write_square(col, row, CROSS)).to.equal(CROSS);
        expect(board.read_square(col, row)).to.equal(CROSS);

      });

      it('should return undefined if symbol already written', function(){
        var row = 1, col = 1;
        board.write_square(row, col, NAUGHT);
        expect(board.write_square(row, col, CROSS)).to.be.an('undefined');
      });

      it('should only accept 1 or 2 as symbol and throw error otherwise', function() {
        expect(board.write_square(1, 1, 3)).to.be.an('undefined');
        expect(board.write_square(1, 1, -1)).to.be.an('undefined');
        expect(board.write_square(1, 1, 0)).to.be.an('undefined');
      });

    })



  })
})
