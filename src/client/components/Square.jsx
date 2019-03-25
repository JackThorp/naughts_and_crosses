// React has to be imported because even though the variable isn't used here, 
// it is callend when the jsx syntax is transpiled to normal js
import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export { Square };
