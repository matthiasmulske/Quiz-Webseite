import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import { Modal } from "react-bootstrap";
import GameQuestionReportModal from "./GameQuestionReportModal";
import ErrorIcon from "@mui/icons-material/Error";
import { List, ListItemText, ListItemIcon, ListItemButton, ListItem, Typography } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
  console.log(modalData);
  const [answers, setAnswers] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState();
  useEffect(() => {
    setAnswers([
      modalData?.Answer1,
      modalData?.Answer2,
      modalData?.Answer3,
      modalData?.CorrectAnswer,
    ]);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false); // Update openModal in the parent component
  };

  useEffect(() => {
    if (player === "player1") {
      setPlayerAnswer(modalData?.AnswerPlayer1.toString());
    } else if (player === "player2") {
      setPlayerAnswer(modalData?.AnswerPlayer2.toString());
    }
  }, [answers]);

  return (
    <Modal show={openModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalData?.QuestionText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
      <List>
  {answers.map((answer, index) => (
    <ListItem key={index}>
      <ListItemIcon>
        <ArrowRightAltIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style= {{ color: index === 3 ? 'green' : "blue" } }>{answer}</Typography>} />
      </ListItem>
  ))}
</List>

        
        <div className="row justify-content-end">
          <div className="col text-end">
            <GameButton
              label={<ErrorIcon />}
              color="error"
              variante="text"
              onClick={handleOpenReportModal}
            />
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
