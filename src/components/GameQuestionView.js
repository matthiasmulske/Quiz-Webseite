import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import ErrorIcon from "@mui/icons-material/Error";
import GameQuestionReportModal from "./GameQuestionReportModal";
import { incrementTrustIndex } from "../api.js";
import domain from "../assets/domain.js";

function GameQuestionView({
  question,
  answers,
  questionID,
  timeLeft,
  setAnswerGiven,
  setTimeLeft,
  answerGiven,
  selectedAnswer,
  setSelectedAnswer,
  trustIndex,
}) {
  const [openModal, setOpenModal] = useState(false); //decides if reportModal is opened
  const [shuffledAnswers, setShuffledAnswers] = useState([]); //shuffels answers in order to display the correct answer not always on the same position
  // Shuffle answers
  function shuffleAnswers(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  // Shuffle the answers and reset the selectedAnswer everytime a new question loads in
  useEffect(() => {
    setShuffledAnswers(shuffleAnswers([...answers]));
  }, [question]);

  const handleOpenReportModal = () => {
    setOpenModal(true);
  };

  const handleAnswerClick = (answer) => {
    incrementTrustIndex( domain.domain + "/incrementTrustIndex",
    questionID);
    if (!answerGiven && timeLeft > 0) {
      setSelectedAnswer(answer);
      setTimeLeft(0);
      for (let i = 0; i < answers.length; i++) {
        if (answer === answers[i]) {
          setAnswerGiven(i + 1);
        }
      }
    } else {
      if (!answerGiven) {
        setAnswerGiven(5);
      }
    }
  };

  return (
    <>
      <div style={style.warning}>
        <GameButton
          label={<ErrorIcon />}
          addClass="p-2 text-end "
          color="error"
          variante="text"
          onClick={handleOpenReportModal}
        />
      </div>

      <GameQuestionReportModal
        question={question}
        questionID={questionID}
        openModal={openModal}
        setOpenModal={setOpenModal}
        trustIndex={trustIndex}
      />

      <h3 style={style.question}>{question}</h3>
      <div style={style.answerGrid}>
        {shuffledAnswers.map((answer, index) => (
          <div style={style.answer} key={index}>
            <GameButton
              label={answer}
              size={"medium"}
              color={
                selectedAnswer
                  ? answer === selectedAnswer
                    ? answer === answers[3]
                      ? "success"
                      : "error"
                    : answer === answers[3]
                      ? "success"
                      : "primary"
                  : "primary"
              }
              onClick={() => handleAnswerClick(answer)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default GameQuestionView;

const style = {
  question: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "2rem",
  },
  warning: {
    display: "grid",
    justifyContent: "end",
  },
  answer: {
    display: "grid",
  },

  answerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns, each with equal width
    gridRowGap: "1.5rem",
    gridColumnGap: "1.5rem",
  },
};
