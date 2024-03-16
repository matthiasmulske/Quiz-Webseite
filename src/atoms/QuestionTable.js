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
    { field: 'CategoryID', headerName: 'Kategorie', editable: true },
    { field: 'comment', headerName: 'Kommmentare', editable: true },
];



const domain = "http://localhost:5000";
const route = domain + "/data";

function QuestionTable() {
    let [tableData, setTableData] = useState(null);
    const [open, setOpen] = React.useState(false);
    let [defaultValues, setDefaultValues] = useState({
        QuestionText: '',
        Answer1: '',
        Answer2: '',
        Answer3: '',
        CorrectAnswer: '',
        CategoryID: 1
    })

    useEffect(() => {
        const fetchData = async () => {
            tableData = await fetch(route, {method: "GET", headers: {"Content-Type": "application/json"}})
                .then(r => r.json())
                .catch(error => { console.error('Error fetching categories:', error) });
        }

        fetchData()
            .then(r => {
                setTableData(tableData);
                return tableData
            })
        .then(() => console.log(tableData))
    }, [])

    const handleRowClick = (params) => {
        setDefaultValues({
            QuestionText: params.row.QuestionText,
            Answer1: params.row.Answer1,
            Answer2: params.row.Answer2,
            Answer3: params.row.Answer3,
            CorrectAnswer: params.row.CorrectAnswer,
            CategoryID: params.row.CategoryID
        })
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    }

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
                              onRowClick={handleRowClick}
                              pageSizeOptions={[30, 30]}>
                    </DataGrid>
                ) : (console.log(""))}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Frage bearbeiten</DialogTitle>
                <DialogContent>
                    <FormAddQuestion
                        onClick={handleClose}
                        defaultValues={defaultValues}
                    />
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
