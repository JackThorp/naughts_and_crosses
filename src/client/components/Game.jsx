import React from 'react';
import Board from './Board.jsx';

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // Do nothing if game won or square already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Fill square
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    
    // Update board state
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner  = calculateWinner(current.squares);

    const moves = history.map((move, turn) => {
      
      const desc = turn ? "Go to turn #" + turn : "Go to beginning";

      return (
        <li key={turn}>
          <button onClick={() => this.jumpTo(turn)}>{desc}</button>
        </li>
      );

    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(x) => this.handleClick(x)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol> {moves}</ol>
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

export default Game;

