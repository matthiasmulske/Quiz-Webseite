import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CheckIcon from '@mui/icons-material/Check';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import GameButton from "../../atoms/GameButton.js";
import { getQuestionsForEdit, updateQuestion, deleteComment } from "../../api.js";
import domain from "../../assets/domain.js";

function QuestionEdit({ userID }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [changeConfirmationOpen, setChangeConfirmationOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [QuestionToUpdate, setQuestionToUpdate] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [userID]);

  async function getData() {
    setLoading(true);
    let datas = await getQuestionsForEdit(domain.domain + "/getQuestionsForEdit", userID);
    setData(datas);
    setLoading(false);
  }

  async function handleEditQuestion(updatedQuestion) {
    setQuestionToUpdate(updatedQuestion);
    setChangeConfirmationOpen(true);
  }

  async function confirmChangeQuestion(updatedQuestion) {
    await updateQuestion(domain.domain + "/updateQuestion", QuestionToUpdate);
    setChangeConfirmationOpen(false);
    getData();
  }

  async function handleDeleteComment(commentID) {
    setCommentToDelete(commentID);
    setDeleteConfirmationOpen(true);
  }

  async function confirmDeleteComment() {
    await deleteComment(domain.domain + "/deleteComment", commentToDelete);
    setDeleteConfirmationOpen(false);
    getData();
  }

  return (
    <div style={style.formContainer}>
      <p>Hier werden alle Fragen dargestellt, für welche du die Verantwortung trägst! Reagierst du nicht innerhalb von 3 Wochen auf einen Kommentar, wird die Frage anderen Spielern zur Verwaltung angeboten!</p>
      {loading ? <CircularProgress style={style.animation} /> : ""}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Frage</TableCell>
              <TableCell>Antwort 1</TableCell>
              <TableCell>Antwort 2</TableCell>
              <TableCell>Antwort 3</TableCell>
              <TableCell>Korrekte Antwort</TableCell>
              <TableCell>Kommentar</TableCell>
              <TableCell>Zeit Kommentar</TableCell>
              <TableCell>Kommentar löschen</TableCell>
              <TableCell>Änderung übernehmen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((question, index) => (
              <TableRow key={index}>
                <TableCell><TextField defaultValue={question.QuestionText} multiline rows={4} onChange={(e) => question.QuestionText = e.target.value} /></TableCell>
                <TableCell><TextField defaultValue={question.Answer1} multiline rows={4} onChange={(e) => question.Answer1 = e.target.value} /></TableCell>
                <TableCell><TextField defaultValue={question.Answer2} multiline rows={4} onChange={(e) => question.Answer2 = e.target.value} /></TableCell>
                <TableCell><TextField defaultValue={question.Answer3} multiline rows={4} onChange={(e) => question.Answer3 = e.target.value} /></TableCell>
                <TableCell><TextField defaultValue={question.CorrectAnswer} multiline rows={4} onChange={(e) => question.CorrectAnswer = e.target.value} /></TableCell>
                <TableCell>{question.Text} </TableCell>
                <TableCell>{question.CommentTimeStamp} </TableCell>
                <TableCell><GameButton onClick={() => handleDeleteComment(question.CommentID)} label={<DeleteForeverIcon></DeleteForeverIcon>} color="error" /></TableCell>
                <TableCell><GameButton onClick={() => handleEditQuestion(question)} label={<CheckIcon></CheckIcon>} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Kommentar löschen?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bist du sicher, dass du diesen Kommentar löschen möchtest?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <GameButton onClick={() => setDeleteConfirmationOpen(false)} label="Abbrechen" />
          <GameButton onClick={confirmDeleteComment} label="Löschen" color="error" autoFocus />
        </DialogActions>
      </Dialog>

      <Dialog
        open={changeConfirmationOpen}
        onClose={() => setChangeConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Anderung übernehmen?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bist du sicher, dass du diese Frage ändern möchtest?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <GameButton onClick={() => setChangeConfirmationOpen(false)} label="Abbrechen" />
          <GameButton onClick={confirmChangeQuestion} label="Ändern" color="warning" autoFocus />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuestionEdit;

const style = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "1rem",
  },

  buttonContainer: {
    display: "grid",
    height: 50,
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns, each with equal width
    gridColumnGap: "20px",
  },

  animation: {
    margin: "2rem",
  },
};
