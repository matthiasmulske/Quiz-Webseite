import React, { useEffect, useState } from "react";
import GameMiniButton from "../atoms/GameMiniButton";
import { Modal, Button } from "react-bootstrap";

const GameScoreboardModal = ({
  modalData,
  openModal,
  setOpenModal,
  player,
}) => {
  const [showModal, setShowModal] = useState(openModal);

  useEffect(() => {
    setShowModal(openModal);
  }, [openModal, player]); // Update showModal whenever openModal changes

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
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Question {modalData?.question_number}</Modal.Title>
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
            <GameMiniButton
              label={<span className="material-icons">report_problem</span>}
              addClass="p-2 text-end "
              color="text-danger"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameScoreboardModal;
