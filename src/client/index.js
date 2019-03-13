import React from 'react';
import ReactDom from 'react-dom';
//import App from './components/App.jsx';
import styles from './scss/application.scss';

class NewGameDialogue extends React.Component {
 
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p> Game Type: {this.props.gameType} </p>
        <button onClick={() => this.props.onClick("Computer")}> vs Computer </button>
        <button onClick={() => this.props.onClick("Player")}> vs Another Player </button>
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  // Render a Square component with appropriate fill value
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  
  render() {

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div> 
        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

}

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      gameType: "Undecided",
      newGame: true,
    }
    this.handleNewGame = this.handleNewGame.bind(this);
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

  handleNewGame(choice) {
    this.setState({gameType: choice, newGame: false});
  }

  render() {

    if(this.state.newGame) {
      return (<NewGameDialogue onClick={this.handleNewGame} gameType={this.state.gameType}/>)
    }

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


    let newGame;
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
       newGame = <button onClick={() => this.setState({newGame: true})}> Play Again </button>;
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
          <div>{newGame}</div>
        </div>
      </div>
    );
  }
}

// ===================================
ReactDom.render( 
  <Game />,
  document.getElementById('root')
);

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

