import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../constants/icon/buttonIcon";
import { MAX_QUESTION_IN_TOUR, TIMEOUT, useMath } from "../contexts/calculate";

function Buttons() {
  const navigate = useNavigate();
  const {
    state, checkAnswer, goToNextQuestion, setIsCorrect,
  } = useMath();
  const [selectedValue, setSelectedValue] = useState("");

  function clickAnswer(value) {
    checkAnswer(value);
    setSelectedValue(value);

    setTimeout(() => {
      setSelectedValue("");
      if (state.currentQuestion == MAX_QUESTION_IN_TOUR) {
        setIsCorrect(null);
        navigate("/end");
      } else {
        goToNextQuestion();
      }
    }, TIMEOUT);
  }

  return (
    <div className="answer-btns">
      {state.answers.map((answer) => {
        return (
          <div className="btn-group" key={answer} disabled>
            <button
              className={selectedValue === answer ? "active" : ""}
              onClick={() => clickAnswer(answer)}
              disabled={selectedValue ? true : false}
            >
              <ButtonIcon
                params={{
                  color:
                    selectedValue === answer
                      ? " #2D2D2D"
                      : selectedValue && state.correctAnswer === answer
                        ? "green"
                        : "#fff",
                }}
              />
              <p className="text-medium">{answer}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Buttons;
