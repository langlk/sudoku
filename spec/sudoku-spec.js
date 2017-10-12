import { Sudoku } from './../js/sudoku.js'

describe('Sudoku', function() {

  describe('isLegal', function() {
    it("returns false if a column does not have the numbers 1-9 once each", function() {
      let board = [];
      for (let i = 0; i < 9; i++) {
        board.push([]);
        for (let j = 0; j < 9; j++) {
          board[i][(j + i) % 9] = j + 1;
        }
      }
      board[0][1] = 1;
      let sudoku = new Sudoku(board);
      expect(sudoku.isLegal()).toEqual(false);
    });

    it("returns false if a row does not have the numbers 1-9 once each", function() {
      let board = [];
      for (let i = 0; i < 9; i++) {
        board.push([]);
        for (let j = 0; j < 9; j++) {
          board[i][(j + i) % 9] = j + 1;
        }
      }
      board[1][0] = 1;
      let sudoku = new Sudoku(board);
      expect(sudoku.isLegal()).toEqual(false);
    });
  });
});
