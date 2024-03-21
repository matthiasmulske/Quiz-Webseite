import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import GameQuestionView from "./GameQuestionView";

function GameQuestion({
  question,
  answers,
  questionID,
  timer,
  setTimer,
  setAnswerGiven,
  handleNextQuestion,
  answerGiven,
  trustIndex,
}) {
  const [timeLeft, setTimeLeft] = useState(timer);
  const [selectedAnswer, setSelectedAnswer] = useState();
  // start Timer when site loads  --> TODO: PERFORMANCE
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prevTimeLeft - 0.05;
        }
      });
    }, 50);
    return () => clearInterval(intervalId);
  }, [timer, timeLeft]);

  function handleButton() {
    setSelectedAnswer(null);
    setTimer(timer);
    setTimeLeft(timer);
    setAnswerGiven(null);
    handleNextQuestion();
  }

  return (
    <div style={style.pageContainer}>
      <div className="progress mb-4">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ minWidth: `${(timeLeft / timer) * 100}%` }}
        ></div>
      </div>

      <div style={style.answerButton}>
        <GameQuestionView
          question={question}
          answers={answers}
          questionID={questionID}
          setTimer={setTimer}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          answerGiven={answerGiven}
          setAnswerGiven={setAnswerGiven}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          trustIndex={trustIndex}
        />
      </div>
      {timeLeft <= 0 && answerGiven ? (
        <div style={style.buttonNextQuestion}>
          <GameButton
            variant="outlined"
            label="Nächste Frage"
            color="warning"
            onClick={handleButton}
          ></GameButton>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default GameQuestion;

const style = {
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    position: "relative",
  },

  answerButton: {
    marginBottom: "3rem",
  },
  buttonNextQuestion: {
    display: "flex",
    justifyContent: "center",
  },
};
