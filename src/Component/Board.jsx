import { useState } from "react";
import Square from "./Square";
import { useEffect } from "react";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState(true);

  const [player1Score, setPlayer1score] = useState(
    parseInt(localStorage.getItem("player1Score")) || 0
  );
  const [player2Score, setPlayer2score] = useState(
    parseInt(localStorage.getItem("player2Score")) || 0
  );

  useEffect(() => {
    localStorage.setItem("player1Score", player1Score.toString());
    localStorage.setItem("player2Score", player2Score.toString());
  }, [player1Score, player2Score]);

  const checkWinner = () => {
    const Lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of Lines) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    if (state.every((square) => square !== null)) {
      return "Draw";
    }
    return false;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    if (isWinner || state[index] !== null) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isPlayerX ? "X" : "O";
    setState(copyState);
    setIsPlayerX(!isPlayerX);
  };

  useEffect(() => {
    if (isWinner) {
      if (isWinner === "X") {
        setPlayer1score(player1Score + 1);
      } else {
        setPlayer2score(player2Score + 1);
      }
    }
  }, [isWinner]);

  return (
    <>
      <div className="board-container">
        <div className="score">
          <h1 className="text">X Score : {player1Score}</h1>
          <h1 className="text">O Score : {player2Score}</h1>
        </div>
        {isWinner ? (
          <h1 className="text">
            {isWinner === "Draw" ? "Draw" : "Winner is" + " " + isWinner}
          </h1>
        ) : (
          <h1 className="text">Next player is {isPlayerX ? "X" : "O"}</h1>
        )}
        <div className="board-row">
          <Square onClick={() => handleClick(0)} value={state[0]} />
          <Square onClick={() => handleClick(1)} value={state[1]} />
          <Square onClick={() => handleClick(2)} value={state[2]} />
        </div>
        <div className="board-row">
          <Square onClick={() => handleClick(3)} value={state[3]} />
          <Square onClick={() => handleClick(4)} value={state[4]} />
          <Square onClick={() => handleClick(5)} value={state[5]} />
        </div>
        <div className="board-row">
          <Square onClick={() => handleClick(6)} value={state[6]} />
          <Square onClick={() => handleClick(7)} value={state[7]} />
          <Square onClick={() => handleClick(8)} value={state[8]} />
        </div>
        <button className="reset" onClick={() => setState(Array(9).fill(null))}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Board;
