import * as React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";

const domain = "http://localhost:5000";
const routeGetData = domain + "/data";
const routeUpdateQuestion = domain + "/updateQuestion"
const routeGetComments = domain + "/getComments"

const columns = [
    { field: 'QuestionID', headerName: 'Frage', editable: true, },
    { field: 'QuestionText', headerName: 'Frage', editable: true, },
    { field: 'Answer1', headerName: 'Antwort A', editable: true, },
    { field: 'Answer2', headerName: 'Antwort B', editable: true, },
    { field: 'Answer3', headerName: 'Antwort C', editable: true },
    { field: 'CorrectAnswer', headerName: 'Antwort D', editable: true },
    { field: 'CategoryID', headerName: 'Kategorie', editable: true },
    { field: 'Text',
        headerName: 'Kommentare',
        editable: false,
        renderCell: () => (
            <strong>
                <Button
                    onClick={() => console.log("implement me")}
                >Zeige Kommentare</Button>
            </strong>
        ),
    },
];


function QuestionTable({userId}) {
    let [tableData, setTableData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            tableData = await fetch(routeGetData, {
                method: "GET",
                headers: {"Content-Type": "application/json", "userid": 3}
            })
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

    async function processRowUpdate(newRow) {
        await updateQuestionDatabase(newRow)
        return newRow
    }

    async function updateQuestionDatabase(newRow) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rowData: newRow })
        };
        fetch(routeUpdateQuestion, requestOptions)
            .then(response => response.json());
    }

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log("ERROR")
    }, []);

    function getRowId(row) {
        return row.QuestionID;
    }

    function getComments(row) {
        let commentsText = ""
        let questionID = (row.row.QuestionID)
        let comments;
        const fetchData = async () => {
            comments = await fetch(routeGetComments, {
                method: "GET",
                headers: {"Content-Type": "application/json", "questionid": questionID}
            })
                .then(r => r.json())
                .catch(error => { console.error('Error fetching categories:', error) });
        }

        fetchData()
            .then(r => {
                return comments
            })
            .then(() => console.log(comments))
            .then(() => comments.map(item => commentsText += " " + (item.Text)))
            .then(() => alert(commentsText))
    }


    return (
        <>
            <div>
                {tableData != null ? (
                    <DataGrid style={style.table}
                              getRowHeight={() => 'auto'}
                              getRowId={getRowId}
                              rows={tableData}
                              columns={columns}
                              initialState={{
                                  pagination: {
                                      paginationModel: {page: 0, pageSize: 30},
                                  },
                              }}
                              onRowClick={getComments}
                              pageSizeOptions={[30, 30]}
                              processRowUpdate={processRowUpdate}
                              onProcessRowUpdateError={handleProcessRowUpdateError}
                    >
                    </DataGrid>
                ) : (console.log(""))}
            </div>
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
