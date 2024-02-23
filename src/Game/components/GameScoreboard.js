import React, { useState } from "react";
import GameScoreboardModal from "./GameScoreboardModal";
import GameButton from "../atoms/GameButton";
import questions from "../../data/questions.json";

function GameScoreboard() {
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);

  const handleButtonClick = (question, player) => {
    setModalData(question);
    setOpenQuestionModal(true);
    setModalPlayer(player);
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
    <div className="text-center">
      <div >
      <h2 >Scoreboard</h2>
      <h2 > scoreplayer1 : scorePlayer2 </h2>
        {questionsChunks.map((chunk, index) => (
          <div key={index} style={style.GridContainer}>
           
              <div style={style.ChunkContainer}>
                {chunk.map((question) => (
                  <div key={question.question_number}>
                    <GameButton
                     color={(question.player1_answer===question.correct_answer) ? "success" : "error"}                     
                     onClick={() => handleButtonClick(question, "player1")}
                     label={question.question_number}
                     size="large"
                    />
                  </div>
                ))}
              </div>
              <div>
              <div style={style.ChunkContainer}>
                {chunk.map((question) => (
                  <div key={question.question_number}>
                    <GameButton
                      color={(question.player2_answer===question.correct_answer) ? "success" : "error"}
                      onClick={() => handleButtonClick(question, "player2")}
                      label={question.question_number}
                      size="large"
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

const style = {
  GridContainer: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'auto auto' ,
    gridColumnGap: '10%',
  },
  ChunkContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto, auto, auto',
    margin: "15px"
    
  },
}