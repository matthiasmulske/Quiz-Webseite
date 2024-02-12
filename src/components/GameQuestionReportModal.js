import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown";
import GameInput from "../atoms/GameInput";
import GameButton from "../atoms/GameButton";

const GameQuestionReportModal = ({ modalData, openModal, setOpenModal }) => {
  const [showModal, setShowModal] = useState(openModal);
  const categories = [
    "Frage falsch",
    "Frage unangemessen",
    "Rechtsschreibung",
    "Sonstiges",
  ];
  const [category, setCategory] = useState("Seekabelkunde");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setShowModal(openModal);
  }, [openModal]); // Update showModal whenever openModal changes

  const handleCloseModal = () => {
    setOpenModal(false); // Update openModal in the parent component
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      dialogClassName="modal-xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Frage melden </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center container justify-content-center align-items-center mb-3">
          <div className="mb-3">{modalData?.question_text}</div>
          <GameCategoryDropdown
            label="Kategorie"
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            selectedOption={category}
            onChange={handleCategoryChange}
            name="Kategorie wählen"
          />
          <GameInput
            value={commentText}
            onChange={handleCommentTextChange}
            label="Kommentar"
            type="text"
            icon="notes"
            required={true}
          />
          <GameButton label="Senden" />
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default GameQuestionReportModal;
