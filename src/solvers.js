/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// window.findSolution(row, n, board, validator, callback) {
//
// }

window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  var count = 0;
  for (var i = 0; i < board.rows().length; i++) {
    if ( !board.hasAnyRowConflicts(i) && !board.hasAnyColConflicts(i) ) {
      board.togglePiece(i, i);
      count++;
      solution.push(board.rows()[i]);
    }
  }
  if (count === n) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

    var recursive = function(row) {
      //reached last row with a piece laid down
      if (row === n) {
        solutionCount++;
        return;
      }
      // loop through each col at specfic row
      for ( var i = 0; i < n; i++) {
        // toggle
        board.togglePiece(row, i);
        // if no conflict recurse into next branch
        if (!board.hasColConflictAt(i)) {
          recursive(row+1);
        }
        // untoggle
        board.togglePiece(row, i);
      }
    }
    recursive(0)
    return solutionCount;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let solutionCount = 0;
  var solution;
  var board = new Board({n:n});
  // no solution for n = 2, 3
  if (n === 2 ) return [[0,0], [0,0]];
  if (n === 3 ) return [[0,0,0], [0,0,0], [0,0,0]];


  var findQueens = function(row) {
    if (row === n) {
      // console.log('board.rows: ' + board.rows().join('\t\n'));
      solutionCount++;
      //save a solution state of the board before recursing untoggled
      solution = _.map(board.rows(), function(row){
        return row.slice();
      });
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if ( !board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts() ) {
        findQueens(row + 1);
      }
      board.togglePiece(row, i);
    }
  }
  findQueens(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  // one solution for n = 0, 1
  if (n <= 1) {
    return 1;
  }
  // no solution for n = 2, 3
  if (n <= 3) {
    return 0;
  }
  var findQueens = function(row) {
    //basecase we reached end of board (end of row) with piece toggled
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      //toggle piece
      board.togglePiece(row, i);
      if ( !board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts() ) {
        findQueens(row + 1);
      }
      //untoggle piece
      board.togglePiece(row, i);
    }
  }
  findQueens(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
