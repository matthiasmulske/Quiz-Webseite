import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import { Modal } from "react-bootstrap";
import GameQuestionReportModal from "./GameQuestionReportModal";
import ErrorIcon from "@mui/icons-material/Error";
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Typography,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const GameScoreboardModal = ({
  modalData,
  openModal,
  setOpenModal,
  player,
}) => {
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportData, setReportData] = useState();
  const handleOpenReportModal = () => {
    setReportData(modalData);
    setOpenReportModal(true);
  };

  const [answers, setAnswers] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState();
  useEffect(() => {
    setAnswers([
      modalData?.Answer1,
      modalData?.Answer2,
      modalData?.Answer3,
      modalData?.CorrectAnswer,
    ]);
  }, [modalData]);

  const handleCloseModal = () => {
    setOpenModal(false); // Update openModal in the parent component
  };

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
              <ListItemText>
                {player === "player1" ? (
                  <Typography
                    style={{
                      color:
                        index === 3
                          ? "green"
                          : modalData?.AnswerPlayer1 - 1 === index
                            ? "red"
                            : "grey",
                    }}
                  >
                    {answer}
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      color:
                        index === 3
                          ? "green"
                          : modalData?.AnswerPlayer2 - 1 === index
                            ? "red"
                            : "grey",
                    }}
                  >
                    {answer}
                  </Typography>
                )}
              </ListItemText>
            </ListItem>
          ))}
        </List>

        <div className="row justify-content-end">
          <div className="col text-end">
            <GameQuestionReportModal
              question={modalData?.QuestionText}
              questionID={modalData?.QuestionID}
              trustIndex={modalData?.TrustIndex}
              openModal={openReportModal}
              setOpenModal={setOpenReportModal}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <GameButton
          label={<ErrorIcon />}
          color="error"
          variante="text"
          onClick={handleOpenReportModal}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default GameScoreboardModal;
