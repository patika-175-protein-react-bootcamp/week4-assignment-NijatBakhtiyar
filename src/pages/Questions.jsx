import React from "react";
import { Navigate } from "react-router-dom";
import Buttons from "../components/Buttons";
import { BoardIcon } from "../constants/icon";
import { useMath } from "../contexts/calculate";

function Questions() {
  const { selectedOperation, state } = useMath();

  // GET DATA FROM STORAGE
  const mathGame = JSON.parse(localStorage.getItem("mathGame"));

  if (!selectedOperation) {
    return <Navigate to="/start" />;
  }

  return (
    <div className="question-page">
      <div className="left">
        <div className="board">
          <BoardIcon />
          <p className="text">
            {state.numbers.num1} {selectedOperation} {state.numbers.num2}
          </p>
        </div>
      </div>
      <div className="right">
        <div className="top-bar">
          <p className="text-small">Score: {state.score}</p>
          <p className="text-small">Tour: {mathGame?.tour || 1}</p>
          <p className="text-small">
            Questions: {state.correctAnswerCount} / {state.currentQuestion}
          </p>
        </div>
        <Buttons />
      </div>
    </div>
  );
}

export default Questions;
