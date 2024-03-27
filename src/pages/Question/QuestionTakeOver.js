
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CheckIcon from '@mui/icons-material/Check';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CircularProgress } from "@mui/material";
import Paper from '@mui/material/Paper';
import {
  getQuestionsWithoutUser,
  updateUserForQuestion,
} from "../../api.js";
import domain from "../../assets/domain.js";
import GameButton from "../../atoms/GameButton.js";

function QuestionTakeOver({userID}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); //if true renders a loading animation while quiz is created in DB

  useEffect(() => {
   getData();
  }, []);

  async function getData() {
    let datas = await getQuestionsWithoutUser( domain.domain + "/getQuestionsWithoutUser", userID);
    setData(datas);
  }

  async function handleTakeOver(userID, questionID) {
    setLoading(true);
    updateUserForQuestion(domain.domain + "/updateUserForQuestion", userID, questionID);
    setLoading(false);
  }

  console.log(data);
  return (
    <div style={style.formContainer}>
      <p>Hier werden Fragen dargestellt, die ohne Besitzer sind. Fragen werden besitzerlos, falls der ursprüngliche Ersteller nicht innherhalb von drei Wochen auf Kommentare eingeht. Du kannst hier die Verantwortung für diese Fragen übernehemen!</p>
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
            <TableCell>Letzter Kommentar</TableCell>
            <TableCell>Frage übernehemen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((question, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {question.QuestionText}
              </TableCell>
              <TableCell>{question.Answer1}</TableCell>
              <TableCell>{question.Answer2}</TableCell>
              <TableCell>{question.Answer3}</TableCell>
              <TableCell>{question.CorrectAnswer}</TableCell>
              <TableCell>{question.Text}</TableCell>
              <TableCell><GameButton onClick={() => handleTakeOver(userID, question.QuestionID)} label={<CheckIcon></CheckIcon>} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default QuestionTakeOver;

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
