import * as React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";

const columns = [
    { field: 'QuestionText', headerName: 'Frage', editable: true, },
    { field: 'Answer1', headerName: 'Antwort A', editable: true, },
    { field: 'Answer2', headerName: 'Antwort B', editable: true, },
    { field: 'Answer3', headerName: 'Antwort C', editable: true },
    { field: 'CorrectAnswer', headerName: 'Antwort D', editable: true },
    { field: 'Name', headerName: 'Kategorie', editable: true },
];

const domain = "http://localhost:5000";
const getData = domain + "/data";
const updateQuestion = domain + "/updateQuestion"

function QuestionTable() {
    let [tableData, setTableData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            tableData = await fetch(getData, {
                method: "GET",
                headers: {"Content-Type": "application/json", "userid": "3"}
            })
                .then(r => r.json())
                .catch(error => { console.error('Error fetching categories:', error) });
        }

        fetchData()
            .then(r => {
                setTableData(tableData);
                return tableData
            })
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
        fetch(updateQuestion, requestOptions)
            .then(response => response.json());
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
