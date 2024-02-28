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


function createData(question, A, B, C, D) {
    return { question, A, B, C, D };
}

const rows = [
    createData('Wann wurda das Arpanet Seekabel zerschnitten?', "Ja", "gestern", "41", "42"),
    createData('Wann wurda das Arpanet Seekabel verlegt?', "Ja", "gestern", "41", "42"),
    createData('Wann wurda das Arpanet Seekabel gezogen?', "Ja", "gestern", "41", "42"),
    createData('Wann wurda das Arpanet Seekabel ertränkt?', "Ja", "gestern", "41", "42"),
    createData('Wann wurda das Arpanet Seekabel umsorgt?', "Ja", "gestern", "41", "42"),
];

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
                            key={row.question}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
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
                            <TableCell align="left">{row.A}</TableCell>
                            <TableCell align="left">{row.B}</TableCell>
                            <TableCell align="left">{row.C}</TableCell>
                            <TableCell align="left">{row.D}</TableCell>
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
