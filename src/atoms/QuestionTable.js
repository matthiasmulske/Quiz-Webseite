import * as React from 'react';
import data from "../data/questions.json"
import {DataGrid} from "@mui/x-data-grid";

//TODO: Make me Editable
const tabledata = []
function fillRows() {
    for (let i = 0; i < data.questions.length; i++) {
        tabledata.push({
                id: i,
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

const columns = [
    { field: 'id', headerName: 'ID', width: 5, },
    { field: 'question', headerName: 'Frage', editable: true, flex: "1" },
    { field: 'answerA', headerName: 'Antwort A', editable: true, },
    { field: 'answerB', headerName: 'Antwort B', editable: true, },
    { field: 'answerC', headerName: 'Antwort C', editable: true },
    { field: 'answerD', headerName: 'Antwort D', editable: true },
    { field: 'category', headerName: 'Kategorie', editable: true },

];


function QuestionTable() {
    function handleClick() {
        //alert("Make me editable")
    }

    return (
        <>
            <DataGrid style={style.table}
                rows={tabledata}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 30 },
                    },
                }}
                pageSizeOptions={[30, 30]}
                onCellClick={handleClick}>
            </DataGrid>

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