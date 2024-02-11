import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown";

const GameQuestionReportModal = ({
  modalData,
  openModal,
  setOpenModal,
  player,
}) => {
  const [showModal, setShowModal] = useState(openModal);
  const categories = [
    "Frage falsch",
    "Frage unangemessen",
    "Rechtsschreibung",
    "Sonstiges",
  ];
  const [category, setCategory] = useState("Seekabelkunde");

  useEffect(() => {
    setShowModal(openModal);
  }, [openModal, player]); // Update showModal whenever openModal changes

  const handleCloseModal = () => {
    setOpenModal(false); // Update openModal in the parent component
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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
        {modalData}
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameQuestionReportModal;
