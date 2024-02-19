import React, { useState } from "react";
import GameScoreboardModal from "./GameScoreboardModal";
import GameButton from "../atoms/GameButton";
import questions from "../data/questions.json";

function GameScoreboard() {
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);

  const handleButtonClick = (question, player) => {
    setModalData(question);
    setOpenQuestionModal(true);
    setModalPlayer(player);
  };

  const getButtonColor = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      return "btn-success";
    } else {
      return "btn-danger";
    }
  };

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };
  const questionsChunks = chunkArray(questions.questions, 3);

  return (
    <div className="scoreboard container text-center">
      <h2 className="text-center mb-5">Scoreboard</h2>
      <div className="row">
        <div className="col border-end border-3 border-black">
          <h2 className="text-center mb-5">Spieler 1</h2>
        </div>
        <div className="col">
          <h2 className="text-center mb-5">Spieler 2</h2>
        </div>
      </div>
      <div className="">
        {questionsChunks.map((chunk, index) => (
          <div key={index} className="row">
            <div className="col border-end border-3 border-black">
              <div className="row">
                {chunk.map((question) => (
                  <div key={question.question_number} className="mb-3 col">
                    <GameButton
                      addClass={` ${getButtonColor(question.player1_answer, question.correct_answer)} w-50`}
                      onClick={() => handleButtonClick(question, "player1")}
                      label={question.question_number}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col">
              <div className="row">
                {chunk.map((question) => (
                  <div key={question.question_number} className="mb-3 col">
                    <GameButton
                      addClass={` ${getButtonColor(question.player2_answer, question.correct_answer)} w-50`}
                      onClick={() => handleButtonClick(question, "player2")}
                      label={question.question_number}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <GameScoreboardModal
        modalData={modalData}
        openModal={openQuestionModal}
        setOpenModal={setOpenQuestionModal}
        player={modalPlayer}
      ></GameScoreboardModal>
    </div>
  );
};

export default GameScoreboard;
