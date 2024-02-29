import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GameButton from "./GameButton";
import {useState} from "react";
import EditQuestionContainer from "../components/EditQuestionContainer";
import data from "../data/questions.json"

const rows = []


function fillRows() {
    for (let i = 0; i < data.questions.length; i++) {
        rows.push({
                question: data.questions[i].question_text,
                answerA: data.questions[i].answers[0],
                answerB: data.questions[i].answers[1],
                answerC: data.questions[i].answers[2],
                answerD: data.questions[i].answers[3],
                category: ""
        })
    }
}

fillRows();


function QuestionTable() {
    const [openModal, setOpenModal] = useState(false); //decides if reportModal is opened
    const [modalData, setModalData] = useState(null); //stores necessary data for the reportModal

    const handleOpenReportModal = () => {
        setOpenModal(true);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={boldCellStyle}>Frage</TableCell>
                        <TableCell style={boldCellStyle} align="left">A</TableCell>
                        <TableCell style={boldCellStyle} align="left">B</TableCell>
                        <TableCell style={boldCellStyle} align="left">C</TableCell>
                        <TableCell style={boldCellStyle} align="left">D</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.question}>
                            <TableCell>
                                <GameButton
                                        label={row.question}
                                        variante="text"
                                        onClick={handleOpenReportModal}/>
                                <EditQuestionContainer
                                    modalData={modalData}
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                />
                            </TableCell>
                            <TableCell align="left">{row.answerA}</TableCell>
                            <TableCell align="left">{row.answerB}</TableCell>
                            <TableCell align="left">{row.answerC}</TableCell>
                            <TableCell align="left">{row.answerD}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const boldCellStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
  };

export default QuestionTable;
