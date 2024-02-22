import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Frage</TableCell>
                        <TableCell align="left">A</TableCell>
                        <TableCell align="left">B</TableCell>
                        <TableCell align="left">C</TableCell>
                        <TableCell align="left">D</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.question}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.question}
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

export default QuestionTable;
