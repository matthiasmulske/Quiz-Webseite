import React, { useState } from "react";
import GameButton from "../atoms/GameButton";
import { Modal } from "react-bootstrap";
import GameQuestionReportModal from "./GameQuestionReportModal";
import ErrorIcon from '@mui/icons-material/Error';

const GameScoreboardModal = ({
  modalData,
  openModal,
  setOpenModal,
  player,
}) => {
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportData, setReportData] = useState();
  const handleOpenReportModal = () => {
    console.log(modalData);
    setReportData(modalData);
    setOpenReportModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Update openModal in the parent component
  };

  let playerAnswer;
  if (player === "player1") {
    playerAnswer = modalData?.player1_answer.toString();
  } else if (player === "player2") {
    playerAnswer = modalData?.player2_answer.toString();
  }

  return (
    <Modal show={openModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Question {modalData?.question_text}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalData?.question_text}</p>
        <ul className="list-unstyled">
          {Object.keys(modalData?.answers || {}).map((key) => {
            return (
              <li
                key={key}
                className={`list-group-item 
                        ${
                          key === modalData?.correct_answer.toString()
                            ? " text-success fw-bold "
                            : key === playerAnswer
                              ? "text-danger fw-bold "
                              : "text-secondary"
                        }`}
              >
                {modalData?.answers[key]}
              </li>
            );
          })}
        </ul>
        <div className="row justify-content-end">
          <div className="col text-end">
          <GameButton
                  label={<ErrorIcon/>}
                  color="error"
                  variante="text"
                  onClick={handleOpenReportModal}/>
            <GameQuestionReportModal
              modalData={reportData}
              openModal={openReportModal}
              setOpenModal={setOpenReportModal}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default GameScoreboardModal;
