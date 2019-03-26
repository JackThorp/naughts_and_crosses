import React from 'react';
import Board from './Board.jsx';

class ComputerGame extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      compIsNext: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (i) {
    console.log("Clicked: " + i);
    const squares = this.state.squares.slice();

    // Do nothing if game won or square already won
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    // User is O
    squares[i] = 'O';

    // Take computer go
    let compMove = calculateCompMove(squares, 'X', 'O');
    console.log('Comp Move: ' + compMove);
    squares[compMove] = 'X';

    this.setState({
      squares: squares
    });
    
  }
  
  render() {
    
    const squares = this.state.squares;
    const winner = calculateWinner(squares);

    let status
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Make your move';  
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={this.handleClick}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; 
      }
    }
    return null; 
}


// Helper function for copmuter AI
function calculateCompMove(squares, computer, opponent) {
  
  // First look for gap where line can be finished
  
  // Second block user if they have two in a row

  // Third if there is a line with two empty space go there
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log('a: ' + squares[a] + ', b: ' + squares[b] + ', c: ' + squares[c] );
    // Try to find winning move
    let win_move = twoOfThree(squares, lines[i], computer);
    if(win_move) return win_move;
     
    // Try to block opponent win
    let opp_win = twoOfThree(squares, lines[i], opponent);
    if(opp_win) return opp_win;

    // Try to make a run of two
    let move = twoOfThree(squares, lines[i], null, computer);
    if(move) return move;
  

    // Pick any free square
    if(!squares[a]) return 0;
    if(!squares[b]) return 1;
    if(!squares[c]) return 2;
  }

  return null; 
}

// If two out of three array elements are equal to theTwo
// and the third equal to theThird then the index of 
// theThird element is returned. 
function twoOfThree(squares, line, theTwo, theThird = null) {

  // Assumes line is of length three
  let filled = [];
  let empty = [];

  for(let i = 0; i < line.length; ++i) {
    if(squares[line[i]] == theTwo) {
      filled.push(i);
    } else if (squares[line[i]] == theThird) {
      empty.push(i);
    }
  }

  if(filled.length == 2 && empty.length == 1) {
    return empty[0];
  }

  return null;
}

export default ComputerGame;
