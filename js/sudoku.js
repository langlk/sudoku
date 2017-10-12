export class Sudoku {
  constructor(board) {
    this.board = board;
  }

  isLegal() {
    let columnNumbers;
    let rowNumbers;
    for (let i = 0; i < 9; i++) {
      columnNumbers = new Array(9);
      rowNumbers = new Array(9);
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
    return true;
  }
}
