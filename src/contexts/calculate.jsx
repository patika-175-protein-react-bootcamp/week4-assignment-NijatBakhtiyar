import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getRandomNumbers, shuffleArray } from "../utils";

const MathContext = React.createContext();

export const MAX_QUESTION_IN_TOUR = 10;
export const TIMEOUT = 2000;

function createAnswers({ num1, num2, selectedOperation }) {
  let ans1 = 0;
  let ans2 = 0;
  let ans3 = 0;

  // CONDITIONAL OPERATIONS
  switch (selectedOperation) {
    case "+":
      ans1 = num1 + num2;
      ans2 = num1 + 1 + num2;
      ans3 = num1 + (num2 - 1);
      break;
    case "-":
      ans1 = num1 - num2;
      ans2 = num1 + 1 - num2;
      ans3 = num1 - (num2 + 1);
      break;
    case "x":
      ans1 = num1 * num2;
      ans2 = (num1 + 1) * num2;
      ans3 = num1 * (num2 - 1);
      break;
    case "/":
      ans1 = (num1 / num2).toFixed(1);
      ans2 = ((num1 - 1) / num2).toFixed(1);
      ans3 = (num1 / (num2 - 1)).toFixed(1);
      break;
  }

  return [ans1, ans2, ans3];
}

function getScore(answer) {
  return Math.ceil(Math.sqrt(Math.abs(answer)));
}

const MathProvider = ({ children }) => {
  const [selectedOperation, setSelectedOperation] = useState();
  const [state, setState] = useState({
    numbers: {},
    score: 0,
    currentQuestion: 1,
    correctAnswer: null,
    answers: [],
    isCorrect: null,
    correctAnswerCount: 0,
    questionList: [],
  });

  function populateState(selectedOperation) {
    const numbers = getRandomNumbers();
    const answers = createAnswers({ ...numbers, selectedOperation });

    setState((s) => ({
      ...s,
      numbers,
      correctAnswer: answers[0],
      answers: shuffleArray(answers),
    }));
  }

  useEffect(() => {
    if (selectedOperation) {
      populateState(selectedOperation);
    }
  }, [selectedOperation]);

  // CALCULATE MATH AND CHANGE NEXT QUESTION
  function checkAnswer(selectedAnswer) {
    const isCorrect = selectedAnswer === state.correctAnswer;

    setState((s) => ({
      ...s,
      score: isCorrect ? s.score + getScore(selectedAnswer) : s.score,
      isCorrect,
      correctAnswerCount: isCorrect
        ? s.correctAnswerCount + 1
        : s.correctAnswerCount,
      questionList: [
        ...s.questionList,
        {
          ...s.numbers,
          operation: selectedOperation,
          answer: selectedAnswer,
          isCorrect,
        },
      ],
    }));
  }

  function goToNextQuestion() {
    const newNumbers = getRandomNumbers();
    const newAnswers = createAnswers({ ...newNumbers, selectedOperation });

    setState((s) => ({
      ...s,
      numbers: newNumbers,
      currentQuestion: s.currentQuestion + 1,
      correctAnswer: newAnswers[0],
      answers: shuffleArray(newAnswers),
      isCorrect: null,
    }));
  }

  function restartGame() {
    setState((s) => ({
      ...s,
      numbers: {},
      score: 0,
      currentQuestion: 1,
      correctAnswer: null,
      answers: [],
      isCorrect: null,
      correctAnswerCount: 0,
      questionList: [],
    }));
  }

  function setIsCorrect(value) {
    setState((s) => ({
      ...s,
      isCorrect: value,
    }));
  }

  function saveToStorage() {
    const mathGame = JSON.parse(localStorage.getItem("mathGame")) ?? {
      score: 0,
      tour: 1,
      totalQuestions: 0,
      correctAnswerCount: 0,
    };

    localStorage.setItem(
      "mathGame",
      JSON.stringify({
        score: mathGame.score + state.score,
        tour: mathGame.tour + 1,
        totalQuestions: mathGame.totalQuestions + state.questionList.length,
        correctAnswerCount:
          mathGame.correctAnswerCount + state.correctAnswerCount,
      })
    );
  }

  return (
    <MathContext.Provider
      value={{
        selectedOperation,
        setSelectedOperation,
        state,
        checkAnswer,
        goToNextQuestion,
        restartGame,
        setIsCorrect,
        saveToStorage,
      }}
    >
      {children}
    </MathContext.Provider>
  );
};

function useMath() {
  return useContext(MathContext);
}

MathProvider.propTypes = {
  children: PropTypes.object,
};

export { MathProvider, MathContext, useMath };
