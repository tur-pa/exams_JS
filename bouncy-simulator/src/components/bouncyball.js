import "./bouncyball.css";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { board as examInput } from "../const/ExamInput";

function BouncyBall() {
  const inputBoard = examInput;

  let [startGame, setStartGame] = useState(false);
  let [board, setBoard] = useState(JSON.parse(JSON.stringify(inputBoard)));
  let [positRow, setPositRow] = useState(findBall().rowBall);
  let [positCol, setPositCol] = useState(findBall().colBall);
  let [dirRow, setDirRow] = useState(1);
  let [dirCol, setDirCol] = useState(1);

  function findBall() {
    let rowBall = board.findIndex((row) => row.includes("1"));
    let colBall = board[rowBall].indexOf("1");
    return { rowBall: rowBall, colBall: colBall };
  }

  function drawDirection() {
    if (Math.random() >= 0.5) setDirRow((dirRow = -1 * dirRow));
    else setDirCol((dirCol = -dirCol));
  }

  function movement() {
    board[positRow][positCol] = board[positRow][positCol] = "0";
    setBoard(board);
    setPositRow((positRow = positRow + dirRow));
    setPositCol((positCol = positCol + dirCol));
    checkMovement();
    board[positRow][positCol] = board[positRow][positCol] = "1";
    setBoard(board);
  }

  function checkMovement() {
    if (board[positRow][positCol + dirCol] === "X")
      setDirCol((dirCol = -1 * dirCol));

    if (board[positRow + dirRow][positCol] === "X")
      setDirRow((dirRow = -1 * dirRow));

    if (board[positRow + dirRow][positCol + dirCol] === "X") {
      setDirRow((dirRow = -1 * dirRow));
      setDirCol((dirCol = -dirCol));
    }

    if (board[positRow][positCol] === "Y") {
      drawDirection();
      setBoard((board[positRow][positCol] = "0"));
    }
  }

  function resetGame() {
    board = JSON.parse(JSON.stringify(inputBoard));
    setBoard(board);
    setPositRow(findBall().rowBall);
    setPositCol(findBall().colBall);
    setStartGame(false);
  }

  useEffect(() => {
    if (startGame) {
      const interval = setInterval(() => {
        movement();
      }, 500);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className="App">
      <div>
        <Button
          style={{ margin: "1rem" }}
          variant="outlined"
          onClick={() => setStartGame(!startGame)}
        >
          {startGame ? "Stop" : "Start"}
        </Button>
        <Button variant="outlined" onClick={() => resetGame()}>
          Reset
        </Button>
      </div>
      <div>
        {board.map((rowEl, rowIndex) => (
          <div key={rowIndex}>
            {rowEl.map((columnEl, colIndex) => {
              if (columnEl === "X")
                return <div key={colIndex} className="border"></div>;
              else if (columnEl === "1")
                return <div key={colIndex} className="ball"></div>;
              else if (columnEl === "Y")
                return <div key={colIndex} className="collision"></div>;
              else if (columnEl === "0")
                return <div key={colIndex} className="field"></div>;
              else return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BouncyBall;
