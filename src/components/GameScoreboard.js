import React, { useState } from "react";
import GameScoreboardModal from "./GameScoreboardModal";
import GameButton from "../atoms/GameButton";
import questions from "../data/questions.json";
import ChunkContainer from "../atoms/ChunkContainer";

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
      <GameScoreboardModal
        modalData={modalData}
        openModal={openQuestionModal}
        setOpenModal={setOpenQuestionModal}
        player={modalPlayer}>
      </GameScoreboardModal>

  );
};

export default GameScoreboard;

const style = {
  GridContainer: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'auto auto' ,
    gridColumnGap: '1%',
  },
  ChunkContainer: {
    justifyContent: 'center',
    display: 'grid',
    gridAutoFlow: 'column',
  },

}
