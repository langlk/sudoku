import { Sudoku } from './../js/sudoku.js'

describe('Sudoku', function() {
  describe('solve', function() {
    it('solves a sudoku with one possible solution, returning the solution board', function() {
      let board = [
        [,,,,,,,,],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];

      let solutionBoard = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,7,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.solve()).toEqual([solutionBoard]);
    });

    it('solves a sudoku with multiple possible solutions, returning all solution boards', function() {
      let board = [
        [9,2,6,5,7,1,4,8,3],
        [3,5,1,4,8,6,2,7,9],
        [8,7,4,9,2,3,5,1,6],
        [5,8,2,3,6,7,1,9,4],
        [1,4,9,2,5,8,3,6,7],
        [7,6,3,1,,,8,2,5],
        [2,3,8,7,,,6,5,1],
        [6,1,7,8,3,5,9,4,2],
        [4,9,5,6,1,2,7,3,8]
      ];

      let solutionBoards = [
        [
          [9,2,6,5,7,1,4,8,3],
          [3,5,1,4,8,6,2,7,9],
          [8,7,4,9,2,3,5,1,6],
          [5,8,2,3,6,7,1,9,4],
          [1,4,9,2,5,8,3,6,7],
          [7,6,3,1,4,9,8,2,5],
          [2,3,8,7,9,4,6,5,1],
          [6,1,7,8,3,5,9,4,2],
          [4,9,5,6,1,2,7,3,8]
        ],
        [
          [9,2,6,5,7,1,4,8,3],
          [3,5,1,4,8,6,2,7,9],
          [8,7,4,9,2,3,5,1,6],
          [5,8,2,3,6,7,1,9,4],
          [1,4,9,2,5,8,3,6,7],
          [7,6,3,1,9,4,8,2,5],
          [2,3,8,7,4,9,6,5,1],
          [6,1,7,8,3,5,9,4,2],
          [4,9,5,6,1,2,7,3,8]
        ]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.solve()).toEqual(solutionBoards);
    });
  });

  describe('copy', function() {
    it("copies a nested array because JS makes this horribly difficult", function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,7,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      let copy = sudoku.copy(board);
      expect(copy).toEqual(board);
      console.log(copy);
      console.log(board);
      copy[0][0] = 0;
      expect(board[0][0]).toEqual(1);
      expect(copy[0][0]).toEqual(0);
    });
  });

  describe('full', function() {
    it('returns true if a board has numbers in all slots', function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,7,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.full(board)).toEqual(true);
    });

    it('returns false if a board does not have numbers in all slots', function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,7,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.full(board)).toEqual(false);
    });
  });

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

    it("returns false if a subsquare does not have the numbers 1-9 once each", function() {
      let board = [];
      for (let i = 0; i < 9; i++) {
        board.push([]);
        for (let j = 0; j < 9; j++) {
          board[i][(j + i) % 9] = j + 1;
        }
      }
      let sudoku = new Sudoku(board);
      expect(sudoku.isLegal()).toEqual(false);
    });

    it("returns true if all rows, columns, and subsquares have the numbers 1-9 once each", function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,7,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.isLegal()).toEqual(true);
    });

    it('find if an incomplete board is legal', function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,,9,4,2,1,7],
        [,9,2,,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,,7,9,8],
        [4,1,7,,5,,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.isLegal()).toEqual(true);
    });

    it("finds if an incomplete board is illegal", function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,1,9,4,2,1,7],
        [1,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,,,,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,,7,9,8],
        [4,1,7,,5,,6,3,2],
        [9,2,,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.isLegal()).toEqual(false);
    });
  });

  describe('isSolved', function() {
    it("returns true if a sudoku is both completed and legal", function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [7,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,7,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.isSolved()).toEqual(true);
    });

    it("returns false if a sudoku is not completed", function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,7,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.isSolved()).toEqual(false);
    });

    it("returns false if a sudoku is not valid", function() {
      let board = [
        [1,7,4,2,8,5,3,6,9],
        [8,3,5,6,9,4,2,1,7],
        [6,9,2,1,7,3,8,4,5],
        [2,4,6,5,1,7,9,8,3],
        [3,8,1,9,6,2,5,7,4],
        [1,5,9,3,4,8,1,2,6],
        [5,6,3,4,2,1,7,9,8],
        [4,1,7,8,5,9,6,3,2],
        [9,2,8,7,3,6,4,5,1]
      ];
      let sudoku = new Sudoku(board);
      expect(sudoku.isSolved()).toEqual(false);
    });
  });
});
