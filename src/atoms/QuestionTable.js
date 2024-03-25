import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Alert, Checkbox, FormControlLabel} from "@mui/material";

const domain = "http://localhost:5000";
const getQuestionsRoute = domain + "/getQuestions";
const updateQuestionRoute = domain + "/updateQuestion"
const getCommentsRoute = domain + "/getComments"
const deleteCommentRoute = domain + "/deleteComment"


function QuestionTable({userId}) {
    let [tableData, setTableData] = useState(null);
    let [comments, setComments] = useState()

    const [showMessage, setShowMessage] = useState(true)
    const [submitMessage, setSubmitMessage] = useState("Test")
    const [severity, setSeverity] = useState("Error")


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
            .then(r => { setTableData(r) } )
        fetchMyData(getCommentsRoute, 0)
            .then((r) => setComments(r))
    }, []);

    getComments();
//
    const columns = [
        { field: 'QuestionID', headerName: 'Frage', editable: true, },
        { field: 'QuestionText', headerName: 'Frage', editable: true, },
        { field: 'Answer1', headerName: 'Antwort A', editable: true, },
        { field: 'Answer2', headerName: 'Antwort B', editable: true, },
        { field: 'Answer3', headerName: 'Antwort C', editable: true },
        { field: 'CorrectAnswer', headerName: 'Antwort D', editable: true },
        { field: 'CategoryID', headerName: 'Kategorie', editable: true },
        { field: 'Comments',
            headerName: 'Kommentare',
            editable: false,
            renderCell: (params) => (
                <div>
                    {params.row.Comments && params.row.Comments.map((comment, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                            <Checkbox
                                onChange={() => deleteComment(params.row, comment)}
                            />}
                            label={comment}
                        />
                    ))}
                </div>
            ),
        },
    ];

    function deleteComment(row, commentToDelete) {
        fetchMyData(deleteCommentRoute, commentToDelete).then((r) => {
            return r
        })




        console.log(commentToDelete)
        setSeverity("info")
        setShowMessage(true)
        setSubmitMessage("Kommentare wurde entfernt")

    }

    function getComments() {
        const questions = tableData

        if (Array.isArray(comments) && questions) {
            comments.forEach(comment => {
                const question = questions.find(q => q["QuestionID"] === comment["QuestionID"]);
                if (question) {
                    if ('Comments' in question) {
                        if (!question["Comments"].includes(comment["Text"])) {
                            question["Comments"].push(comment["Text"]);
                            console.log(question)
                        }
                    } else {
                        question["Comments"] = [comment["Text"]];
                    }
                }
            });
        }
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
            {showMessage &&
                <Alert severity={"info"}>
                    {submitMessage}
                </Alert>}
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
