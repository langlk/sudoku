export class Sudoku {
  constructor(board) {
    this.board = board;
  }

  solve() {
    let boardCopy = this.copy(this.board);
    let solution = this.solver(boardCopy);
    console.log(solution);
    return solution;
  }

  solver(board) {
    // find first blank
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!board[i][j]) {
          let squareSolutions = []
          for (let k = 1; k <= 9; k++) {
            // fill in blank
            board[i][j] = k;
            // check if blank is legal
            if (this.legal(board)) {
              // if legal, recurse
              let result = this.solver(this.copy(board));
              if (result) {
                squareSolutions = squareSolutions.concat(result);
              } else {
                board[i][j] = null;
              }
            } // otherwise, try next number
          }
          if (squareSolutions.length === 0) {
            return false;
          } else {
            return squareSolutions;
          }
        }
      }
    }
    if (this.full(board)) {
      let copy = this.copy(board);
      console.log(copy);
      return [copy];
    } else {
      return false;
    }
  }

  copy(board) {
    let copy = new Array(9);
    for (let i = 0; i < 9; i++) {
      copy[i] = [];
      for (let j = 0; j < 9; j++) {
        copy[i].push(board[i][j]);
      }
    }
    return copy;
  }

  full(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  isLegal() {
    return this.legal(this.board);
  }

  legal(board) {
    let columnNumbers;
    let rowNumbers;
    for (let i = 0; i < 9; i++) {
      let columnNumbers = new Array(9);
      let rowNumbers = new Array(9);
      for (let j = 0; j < 9; j++) {
        if (board[i][j]) {
          if (columnNumbers[board[i][j]]) {
            return false;
          } else {
            columnNumbers[board[i][j]] = true;
          }
        }
        if (board[j][i]) {
          if (rowNumbers[board[j][i]]) {
            return false;
          } else {
            rowNumbers[board[j][i]] = true;
          }
        }
      }
    }
    let subSquareNumbers;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        subSquareNumbers = new Array(9);
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            if (board[(i * 3) + k][(j * 3) + l]) {
              if (subSquareNumbers[board[(i * 3) + k][(j * 3) + l]]) {
                return false;
              } else {
                subSquareNumbers[board[(i * 3) + k][(j * 3) + l]] = true;
              }
            }
          }
        }
      }
    }
    return true;
  }
}
