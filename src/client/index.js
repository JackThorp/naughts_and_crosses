import React from 'react';
import {render} from 'react-dom';
//import App from './components/App.jsx';
//import styles from './scss/application.scss';


class Square extends React.Component {
  render() {
    return (
      <button className="square">
      { /* TODO */ }
      </button>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next Player: X';

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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* TODO */ }</div>
          <ol> {/* TODO */ }</ol>
        </div>
      </div>
    );
  }
}

// ===================================
render( 
  <Game />,
  document.getElementById('root')
);
