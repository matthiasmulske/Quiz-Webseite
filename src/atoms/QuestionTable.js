import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Checkbox, FormControlLabel} from "@mui/material";

const domain = "http://localhost:5000";
const getQuestionsRoute = domain + "/getQuestions";
const updateQuestionRoute = domain + "/updateQuestion"
const getCommentsRoute = domain + "/getComments"

function QuestionTable({userId}) {
    let [tableData, setTableData] = useState(null);
    let [comments, setComments] = useState()

    async function fetchMyData(route, id) {
        try {
            const response = await fetch(route, {
                method: "GET",
                headers: { "Content-Type": "application/json", "id": id }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    useEffect(() => {
        fetchMyData(getQuestionsRoute, 3)
            .then(r => {
                setTableData(r)
                getComments()
                return tableData
            })
            .then((tableData) => getComments(tableData))
    }, []);

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
                <FormControlLabel control={<Checkbox/>} label={"comments"}/>
            ),
        },
    ];

    function getComments() {
        console.log(tableData)
    }

    async function processRowUpdate(newRow) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rowData: newRow })
        };
        fetch(updateQuestionRoute, requestOptions)
            .then(response => response.json());
        return newRow
    }

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log("ERROR")
    }, []);

    function getRowId(row) {
        return row.QuestionID;
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
