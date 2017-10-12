export class Sudoku {
  constructor(board) {
    this.board = board;
  }

  isLegal() {
    let columnNumbers;
    let rowNumbers;
    for (let i = 0; i < 9; i++) {
      let columnNumbers = new Array(9);
      let rowNumbers = new Array(9);
      for (let j = 0; j < 9; j++) {
        if (columnNumbers[this.board[i][j]]) {
          return false;
        } else {
          columnNumbers[this.board[i][j]] = true;
        }
        if (rowNumbers[this.board[j][i]]) {
          return false;
        } else {
          rowNumbers[this.board[j][i]] = true;
        }
      }
    }
    let subSquareNumbers;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        subSquareNumbers = new Array(9);
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            if (subSquareNumbers[this.board[(i * 3) + k][(j * 3) + l]]) {
              console.log('square covered')
              return false;
            } else {
              subSquareNumbers[this.board[(i * 3) + k][(j * 3) + l]] = true;
            }
          }
        }
      }
    }
    return true;
  }
}
