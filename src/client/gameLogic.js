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
/*
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
*/
function twoOfThree(line, theTwo, theThird = null) {

  // Assumes line is of length three
  let twos = [];
  let third = [];

  for(let i = 0; i < line.length; ++i) {
    if(line[i] == theTwo) {
      twos.push(i);
    } else if (line[i] == theThird) {
      third.push(i);
    }
  }

  if(twos.length == 2 && third.length == 1) {
    return third[0];
  }

  return null;
  
}


export { calculateWinner, calculateCompMove, twoOfThree };
