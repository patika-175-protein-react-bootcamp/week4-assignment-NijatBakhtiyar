import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CorrectIcon,
  StartIcon,
  UnderlineIcon,
  WrongIcon,
} from "../constants/icon";
import { useMath } from "../contexts/calculate";

function End() {
  const { state, restartGame, saveToStorage, selectedOperation } = useMath();

  const navigate = useNavigate();
  
  useEffect(() => {
    saveToStorage();
    if (!selectedOperation) {
      navigate("/start");
    }
  }, []);

  return (
    <div className="end-page">
      <div className="left">
        <div className="title">
          Final
          <UnderlineIcon params={{ width: 170, height: 5 }} />
        </div>
        <div className="last-score">
          <p className="text">Total Point: {state.score}</p>
          <p className="text">Total Questions: {state.currentQuestion}</p>
          <p className="text">Correct Answers: {state.correctAnswerCount}</p>
        </div>
        <div className="btn-group">
          <Link to="/start" onClick={restartGame}>
            <StartIcon params={{ width: 400 }} />
            <p className="text">Restart</p>
          </Link>
        </div>
      </div>
      <div className="right">
        <div className="title">
          All Questions
          <UnderlineIcon params={{ width: 450, height: 12 }} />
        </div>
        {state.questionList.map((question, index) => {
          return (
            <div className="question-results" key={index}>
              <div className="text">
                <p>
                  {question.num1}
                  {question.operation}
                  {question.num2} = {question.answer}
                </p>
                <span className="result">
                  {question.isCorrect ? (
                    <CorrectIcon
                      params={{ width: 25, height: 30, color: "#fff" }}
                    />
                  ) : (
                    <WrongIcon params={{ width: 25, height: 25 }} />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default End;
