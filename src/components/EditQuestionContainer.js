import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import FormAddQuestion from "./FormAddQuestion";

const GameQuestionReportModal = ({ modalData, openModal, setOpenModal }) => {

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Modal
            show={openModal}
            onHide={handleCloseModal}
            dialogClassName="modal-xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>Frage bearbeiten</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAddQuestion buttonLabel={"Senden"} questionLabel={"Frage bearbeiten"}/>
            </Modal.Body>
        </Modal>
    );
};

export default GameQuestionReportModal;
