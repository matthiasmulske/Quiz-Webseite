import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from "../data/questions.json"
import EditQuestionContainer from "../components/EditQuestionContainer";

const rows = []
function fillRows() {
    for (let i = 0; i < data.questions.length; i++) {
        rows.push({
                question: data.questions[i].question_text,
                answerA: data.questions[i].answers["1"],
                answerB: data.questions[i].answers["2"],
                answerC: data.questions[i].answers["3"],
                answerD: data.questions[i].answers["4"],
                category: ""
        })
    }
}

fillRows();


function QuestionTable() {

    return (
        <>
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
                                <EditQuestionContainer row={row}>{row.question}</EditQuestionContainer>
                                <EditQuestionContainer row={row}>{row.answerA}</EditQuestionContainer>
                                <EditQuestionContainer row={row}>{row.answerB}</EditQuestionContainer>
                                <EditQuestionContainer row={row}>{row.answerC}</EditQuestionContainer>
                                <EditQuestionContainer row={row}>{row.answerD}</EditQuestionContainer>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

const boldCellStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
  };

export default QuestionTable;
