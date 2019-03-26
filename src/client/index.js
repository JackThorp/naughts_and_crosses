import React from 'react';
import ReactDom from 'react-dom';
import styles from './scss/application.scss';
import Game from './components/Game.jsx';
import ComputerGame from './components/ComputerGame.jsx';

// ===================================
ReactDom.render( 
  <ComputerGame />,
  document.getElementById('root')
);


