import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown";
import GameInput from "../atoms/GameInput";
import GameButton from "../atoms/GameButton";
import CommentIcon from '@mui/icons-material/Comment';

const GameQuestionReportModal = ({ question, questionID, openModal, setOpenModal }) => {
  const categories = [
    "Frage falsch",
    "Frage unangemessen",
    "Rechtsschreibung",
    "Sonstiges",
  ]; //Stores CommentCategories for Dropdown-Input
  const [category, setCategory] = useState("Frage falsch"); //stores choosen CommentCategory
  const [commentText, setCommentText] = useState(""); //stores comment of the user

  const handleCloseModal = () => {
    setOpenModal(false); // Update openModal in the parent component so it closes correctly
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };
  return (
    <Modal
      show={openModal}
      onHide={handleCloseModal}
      dialogClassName="modal-xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Frage melden </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center container justify-content-center align-items-center mb-3">
          <div className="mb-3">Question ID: {questionID}</div>
          <div className="mb-3">{question}</div>
          {/* <GameCategoryDropdown
            label="Kategorie"
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            selectedOption={category}
            onChange={handleCategoryChange}
            name="Kategorie wählen"
          /> */}
          <GameInput
            value={commentText}
            onChange={handleCommentTextChange}
            label="Kommentar"
            type="text"
            icon={<CommentIcon/>}
            required={true}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
          <GameButton label="Senden"/>

      </Modal.Footer>
    </Modal>
  );
};

export default GameQuestionReportModal;
