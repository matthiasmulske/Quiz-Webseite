import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import ErrorIcon from "@mui/icons-material/Error";
import GameQuestionReportModal from "./GameQuestionReportModal";


function GameQuestionView({ question, answers, setTimer, timeLeft, setAnswerGiven, setTimeLeft, answerGiven, selectedAnswer, setSelectedAnswer }) {
  const [openModal, setOpenModal] = useState(false); //decides if reportModal is opened
  const [modalData, setModalData] = useState(null); //stores necessary data for the reportModal
  const [shuffledAnswers, setShuffledAnswers] = useState([]); //shuffels answers in order to display the correct answer not always on the same position
  //const [selectedAnswer, setSelectedAnswer]=useState();
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
    //setSelectedAnswer();
    setShuffledAnswers(shuffleAnswers([...answers]));
  }, [question]);

  const handleOpenReportModal = () => {
    setModalData(question);
    setOpenModal(true);
  };

  const handleAnswerClick = (answer) => {
    if (!answerGiven && timeLeft>0) {
      setSelectedAnswer(answer);
      //setTimer(0);  // Stop the timer
      setTimeLeft(0);
      for (let i = 0; i < answers.length; i++) {
        if (answer === answers[i]) {
          console.log("Clicked on Answer " + i);
          setAnswerGiven(i);
        }
        if (answer === answers[3]) {
          console.log("Correct answer!");
          //setIsCorrect(true);
        } else {
          console.log("Incorrect Answer!");
          //setIsCorrect(false);
        }
      }
    }
    else {
      console.log("timer run out")
      if(!answerGiven){
      setAnswerGiven(5);
      }
    }
    console.log("AG" +selectedAnswer);
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
        modalData={modalData}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <h3 style={style.question}>{question}</h3>
      <div style={style.answerGrid}>
        {shuffledAnswers.map((answer, index) => (
          <div style={style.answer} key={index}>
            <GameButton
              label={answer}
              color={
                selectedAnswer ? (answer===selectedAnswer? (answer===answers[3] ? "success" : "error") : (answer===answers[3]? "success":"primary")):"primary"
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
    fontSize: 40,
    textAlign: "center",
    marginBottom: 50,
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
    height: 150,
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns, each with equal width
    gridRowGap: "20px",
    gridColumnGap: "20px",
  },
};
