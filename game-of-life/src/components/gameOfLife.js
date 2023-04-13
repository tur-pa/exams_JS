import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./gameOfLife.css";

// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function GameOfLife() {
  const cols = 15;
  const rows = 15;

  const [grid, setGrid] = useState(createGrid());
  const [startGame, setStartGame] = useState(false);

  function getNeighbors(cellRow, cellCol) {
    if (cellRow >= 0 && cellRow < rows && cellCol >= 0 && cellCol < cols) {
      let top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft;
      if (cellRow - 1 >= 0 && cellCol + 1 < cols) {
        top = grid[cellRow - 1][cellCol];
        topRight = grid[cellRow - 1][cellCol + 1];
      } else {
        top = 0;
        topRight = 0;
      }
      if (cellCol + 1 < cols) {
        right = grid[cellRow][cellCol + 1];
      } else right = 0;
      if (cellRow + 1 < rows && cellCol + 1 < cols)
        bottomRight = grid[cellRow + 1][cellCol + 1];
      else bottomRight = 0;
      if (cellRow + 1 < rows) bottom = grid[cellRow + 1][cellCol];
      else bottom = 0;
      if (cellCol - 1 >= 0 && cellRow + 1 < rows) {
        bottomLeft = grid[cellRow + 1][cellCol - 1];
        left = grid[cellRow][cellCol - 1];
      } else {
        bottomLeft = 0;
        left = 0;
      }
      if (cellRow - 1 >= 0 && cellCol - 1 >= 0) {
        topLeft = grid[cellRow - 1][cellCol - 1];
      } else {
        topLeft = 0;
      }

      const newNeighbors = [
        top,
        topRight,
        right,
        bottomRight,
        bottom,
        bottomLeft,
        left,
        topLeft,
      ];
      return newNeighbors;
    }
    return [];
  }

  function calcAliveNeighbors(neighbors) {
    let sum = 0;
    for (let neighbor of neighbors) {
      if (neighbor === 1) sum++;
    }
    return sum;
  }

  function createGrid() {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  }

  function randomGrid() {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random() * 2)); // RANDOM INPUT
      }
      grid.push(row);
    }
    setGrid(grid);
  }

  function getSimulation() {
    // DEEP COPY OD 2D ARRAY :ooo)
    const evoluatedGrid = JSON.parse(JSON.stringify(grid));
    //
    grid.forEach((row, cellRow) => {
      row.forEach((currCell, cellCol) => {
        const neighbors = getNeighbors(cellRow, cellCol);
        const sumAliveNeighbors = calcAliveNeighbors(neighbors);
        if (
          grid[cellRow][cellCol] === 1 &&
          (sumAliveNeighbors < 2 || sumAliveNeighbors > 3)
        ) {
          evoluatedGrid[cellRow][cellCol] = 0;
        }
        if (grid[cellRow][cellCol] === 0 && sumAliveNeighbors === 3) {
          evoluatedGrid[cellRow][cellCol] = 1;
        }
      });
    });
    setGrid(evoluatedGrid);
  }

  function cellClick(rowIndex, colIndex) {
    let newGrid = Array.from(grid);
    newGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    setGrid(newGrid);
  }

  function resetGame() {
    setStartGame(false);
    setGrid(createGrid());
  }

  useEffect(() => {
    if (startGame) {
      const interval = setInterval(() => {
        getSimulation();
      }, 500);
      return () => clearInterval(interval);
    }
  });

  return (
    <div>
      <Button
        style={{ margin: "1rem" }}
        size="small"
        variant="outlined"
        onClick={() => setStartGame(!startGame)}
      >
        {startGame ? "Stop" : "Start"}
      </Button>
      <Button
        style={{ margin: "1rem" }}
        size="small"
        variant="outlined"
        onClick={() => randomGrid()}
      >
        Random
      </Button>
      <Button
        style={{ margin: "1rem" }}
        size="small"
        variant="outlined"
        onClick={() => resetGame()}
      >
        Reset
      </Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 15px)`,

          width: "fit-content",
          margin: "auto",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div
              key={colIndex}
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: grid[rowIndex][colIndex] ? "orange" : "grey",
                border: "1px solid black",
              }}
              onClick={() => cellClick(rowIndex, colIndex)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default GameOfLife;
