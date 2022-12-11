let sudokuGrid = [
  [7, 0, 4, 8, 0, 0, 3, 0, 1],
  [8, 2, 0, 5, 0, 0, 0, 4, 0],
  [0, 0, 9, 4, 3, 0, 5, 0, 0],
  [3, 1, 0, 0, 0, 0, 8, 0, 7],
  [0, 8, 0, 0, 0, 0, 0, 1, 0],
  [9, 0, 7, 0, 0, 0, 0, 3, 2],
  [0, 0, 6, 0, 1, 5, 4, 0, 0],
  [0, 7, 0, 0, 0, 9, 0, 6, 5],
  [5, 0, 8, 0, 0, 2, 1, 0, 3],
];

console.log(`Start grid:`);
printSudoku(sudokuGrid);

function printSudoku(grid) {
  let printText = ``;
  for (let currRow = 0; currRow < 9; currRow++) {
    for (let currCol = 0; currCol < 9; currCol++) {
      printText += grid[currRow][currCol] + ` `;
    }
    console.log(printText);
    printText = ``;
  }
}

function valueChecker(sudokuGrid, currRow, currCol, testNum) {
  //CHECK ROWS
  for (let i = 0; i < sudokuGrid.length; i++) {
    if (sudokuGrid[currRow][i] === testNum) return false;
  }

  //CHECK COLUMN
  for (let j = 0; j < sudokuGrid.length; j++) {
    if (sudokuGrid[j][currCol] === testNum) return false;
  }

  //CHECK 3x3
  let startRow = currRow - (currRow % 3);
  let startCol = currCol - (currCol % 3);
  for (let k = 0; k < 3; k++) {
    for (let l = 0; l < 3; l++) {
      if (sudokuGrid[k + startRow][l + startCol] === testNum) return false;
    }
  }

  return true;
}

function sudokuSolver(sudokuGrid) {
  for (let currRow = 0; currRow < 9; currRow++) {
    for (let currCol = 0; currCol < 9; currCol++) {
      if (sudokuGrid[currRow][currCol] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (valueChecker(sudokuGrid, currRow, currCol, num)) {
            sudokuGrid[currRow][currCol] = num;
            if (sudokuSolver(sudokuGrid)) return sudokuGrid;
            else sudokuGrid[currRow][currCol] = 0;
          }
        }
        return false;
      }
    }
  }
  return sudokuGrid;
}
console.log(`Solve:`);
printSudoku(sudokuSolver(sudokuGrid));
