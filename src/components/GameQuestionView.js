import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import GameMiniButton from "../atoms/GameIconButton";
import GameQuestionReportModal from "./GameQuestionReportModal";

function GameQuestionView({question, answers}) {
  const [openModal, setOpenModal] = useState(false); //decides if reportModal is opened
  const [modalData, setModalData] = useState(null); //stores necessary data for the reportModal
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

  // Shuffle the answers only once the component mounts
  useEffect(() => {
    setShuffledAnswers(shuffleAnswers([...answers]));
  }, []);

  const handleOpenReportModal = () => {
    setModalData(question);
    setOpenModal(true);
  };

  return (
    <>
      <div style={style.warning}>
          <GameMiniButton
            label={<span className="material-icons">report_problem</span>}
            addClass="p-2 text-end "
            color="text-danger"
A            onClick={handleOpenReportModal}/>
      </div>

          <GameQuestionReportModal
            modalData={modalData}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />

      <h3 style={style.question}>{question}</h3>
        {shuffledAnswers.map((answer, index) => (
          <div className="col mb-4" key={index}>
            <GameButton label={answer} addClass={"btn-secondary w-100"} />
          </div>
        ))}
    </>
  );
}

export default GameQuestionView;

const style = {
  question: {
    textAlign: 'center',
  },
  warning: {
    display: 'grid',
    justifyContent: 'end'
  }
}
