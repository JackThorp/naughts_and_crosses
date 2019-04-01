import React from 'react';
import Board from './Board.jsx';
import {calculateWinner, calculateCompMove} from '../gameLogic.js';

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

export default ComputerGame;
