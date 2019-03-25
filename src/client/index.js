import React from 'react';
import ReactDom from 'react-dom';
import styles from './scss/application.scss';
import Game from './components/Game.jsx';


// ===================================
ReactDom.render( 
  <Game />,
  document.getElementById('root')
);


