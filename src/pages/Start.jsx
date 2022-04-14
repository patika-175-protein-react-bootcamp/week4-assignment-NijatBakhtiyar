import React from "react";
import { useNavigate } from "react-router-dom";
import { StartIcon, UnderlineIcon } from "../constants/icon";
import { useMath } from "../contexts/calculate";

function Start() {
  // SET OPERATION FOR CALCULATE
  const { setSelectedOperation } = useMath();

  // GET DATA FROM STORAGE
  const mathGame = JSON.parse(localStorage.getItem("mathGame"));

  // TURN TO NEXT PAGE
  const navigate = useNavigate();

  function startGame(e) {
    e.preventDefault();
    navigate("/question");
    setSelectedOperation(e.currentTarget.selectOpr.value);
  }

  return (
    <div className="start-page">
      <div className="title">
        Mathematics Game
        <UnderlineIcon params={{ width: "100%", height: 10 }} />
      </div>
      <div className="last-score">
        <p className="text">Total Point: {mathGame?.score || 0}</p>
        <p className="text">Total Questions: {mathGame?.totalQuestions || 0}</p>
        <p className="text">
          Correct Answers: {mathGame?.correctAnswerCount || 0}
        </p>
      </div>
      <form onSubmit={startGame}>
        <div className="btn-group">
          <button>
            <StartIcon />
            <p className="text">Start</p>
          </button>
        </div>
        <select name="selectOpr" required>
          <option value="">Select Operation</option>
          <option value="+">Add</option>
          <option value="-">Subtrack</option>
          <option value="/">Divide</option>
          <option value="x">Multiply</option>
        </select>
      </form>
    </div>
  );
}

export default Start;
