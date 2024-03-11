import * as React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import FormAddQuestion from "../components/FormAddQuestion";

const columns = [
    { field: 'QuestionText', headerName: 'Frage', editable: true, flex: "1" },
    { field: 'Answer1', headerName: 'Antwort A', editable: true, },
    { field: 'Answer2', headerName: 'Antwort B', editable: true, },
    { field: 'Answer3', headerName: 'Antwort C', editable: true },
    { field: 'CorrectAnswer', headerName: 'Antwort D', editable: true },
    { field: 'category', headerName: 'Kategorie', editable: true },
];

const domain = "http://localhost:5000";
const route = domain + "/data";

function QuestionTable() {
    let [tableData, setTableData] = useState(null);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            tableData = await fetch(route, {method: "GET", headers: {"Content-Type": "application/json"}})
                .then(r => r.json())
                .catch(error => { console.error('Error fetching categories:', error) });
        }
        fetchData().then(r =>
            setTableData(tableData),
        );

    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getRowId(row) {
        return row.QuestionID;
    }

    return (
        <>
            <div>
                {tableData != null ? (
                    <DataGrid style={style.table}
                              getRowId={getRowId}
                              rows={tableData}
                              columns={columns}
                              initialState={{
                                  pagination: {
                                      paginationModel: {page: 0, pageSize: 30},
                                  },
                              }}
                              pageSizeOptions={[30, 30]}
                              onCellClick={handleClickOpen}>
                    </DataGrid>
                ) : (console.log("Loading"))}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Frage bearbeiten</DialogTitle>
                <DialogContent>
                    <FormAddQuestion onClick={handleClose}/>
                </DialogContent>
            </Dialog>

        </>
    );
}

const style = {
    table: {
        display: "flex",
        width: "100%",
    },
}
export default QuestionTable;
