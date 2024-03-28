import React, { useState } from "react";
import GameScoreboardModal from "./GameScoreboardModal";
import GameButton from "../atoms/GameButton";

function GameScoreboard({
  quizdata,
  isSinglePlayer,
  player1Score,
  player2Score,
  currentQuestion,
}) {
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);

  const handleButtonClick = (question, player) => {
    if (question.QuestionNumber < currentQuestion) {
      setModalData(question);
      setOpenQuestionModal(true);
      setModalPlayer(player);
    }
  };

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };
  const questionsChunks = chunkArray(quizdata, 3);

  return (
    <div className="text-center p-1 m-1 ">
      {isSinglePlayer ? (
        <h2>Score: {player1Score}</h2>
      ) : (
        <h2>
          {" "}
          {player1Score} : {player2Score}{" "}
        </h2>
      )}
      <div className="d-flex flex-column overflow-x-scroll ">
        {questionsChunks.map((chunk, index) => (
          <div key={index} style={style.Container}>
            <div style={style.ChunkContainer}>
              {chunk.map((question) => (
                <div key={question.QuestionNumber}>
                  <GameButton
                    color={
                      question.AnswerPlayer1
                        ? question.AnswerPlayer1 === 4
                          ? "success"
                          : "error"
                        : "primary"
                    }
                    onClick={() => handleButtonClick(question, "player1")}
                    label={question.QuestionNumber}
                    size="small"
                  />
                </div>
              ))}
            </div>
            {!isSinglePlayer ? (
              <div>
                <div style={style.ChunkContainer}>
                  {chunk.map((question) => (
                    <div key={question.question_number}>
                      <GameButton
                        color={
                          question.AnswerPlayer2
                            ? question.AnswerPlayer2 === 4
                              ? "success"
                              : "error"
                            : "primary"
                        }
                        onClick={() => handleButtonClick(question, "player2")}
                        label={question.QuestionNumber}
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
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
}

export default GameScoreboard;

const style = {
  Container: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },

  ChunkContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
    margin: "0.2rem",
  },
};
