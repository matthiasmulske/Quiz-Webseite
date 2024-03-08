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
  console.log(questionsChunks);
  return (
    <div className="text-center m-3 p-3">
      {isSinglePlayer ? (
        <h2>Score: {player1Score}</h2>
      ) : (
        <h2>
          {" "}
          {player1Score} : {player2Score}{" "}
        </h2>
      )}
      <div>
        {questionsChunks.map((chunk, index) => (
          <div
            key={index}
            style={
              isSinglePlayer
                ? style.GridContainerSinglePlayer
                : style.GridContainer
            }
          >
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
  GridContainer: {
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateColumns: "auto auto",
    gridColumnGap: "10%",
  },

  GridContainerSinglePlayer: {
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateColumns: "auto",
    gridColumnGap: "10%",
  },

  ChunkContainer: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "auto, auto, auto",
    margin: "15px",
  },
};
