import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import GameMiniButton from "../atoms/GameIconButton";
import GameQuestionReportModal from "./GameQuestionReportModal";

const GameQuestionView = ({
  question,
  answer1,
  answer2,
  answer3,
  correctAnswer,
}) => {
  const answers = [answer1, answer2, answer3, correctAnswer];
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Shuffle function to randomly rearrange the answers
  const shuffleAnswers = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // Shuffle the answers only once when component mounts
  useEffect(() => {
    setShuffledAnswers(shuffleAnswers([...answers]));
    // eslint-disable-next-line
  }, []);

  const handleOpenReportModal = () => {
    setModalData(question);
    setOpenModal(true);
  };

  return (
    <div>
      <div className="row justify-content-end">
        <div className="col text-end">
          <GameMiniButton
            label={<span className="material-icons">report_problem</span>}
            addClass="p-2 text-end "
            color="text-danger"
            onClick={handleOpenReportModal}
          />
          <GameQuestionReportModal
            modalData={modalData}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
      <div className="mb-4">
        <h3>{question}</h3>
      </div>
      <div className="mb-4">
        {shuffledAnswers.map((answer, index) => (
          <div className="col mb-4" key={index}>
            <GameButton label={answer} addClass={"btn-secondary w-100"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameQuestionView;
