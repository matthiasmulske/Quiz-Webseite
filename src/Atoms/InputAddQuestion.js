import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as React from "react";



function InputAddQuestion() {
    function handleChange() {
    }

    return (
        <div>
            <TextField
                sx={style.inputQuestion}
                id="outlined-multiline-flexible"
                label="Frage vorschlagen"
                multiline
                rows={8}
            />
            <div style={style.gridContainer}>
                <TextField
                    sx={style.answerField}
                    id="outlined-multiline-flexible"
                    label="Antwort A"
                    fullWidth={true}
                    multiline
                    rows={4}
                />
                <TextField
                    sx={style.answerField}
                    id="outlined-multiline-flexible"
                    label="Antwort B"
                    fullWidth={true}
                    multiline
                    rows={4}
                />
                <TextField
                    sx={style.answerField}
                    id="outlined-multiline-flexible"
                    label="Antwort C"
                    fullWidth={true}
                    multiline
                    rows={4}
                />
                <TextField
                    sx={style.answerField}
                    id="outlined-multiline-flexible"
                    label="Antwort D"
                    fullWidth={true}
                    multiline
                    rows={4}
                />
            </div>
            <FormControl style={style.formControlContainer}>
                <InputLabel id="demo-simple-select-label" style={style.dropDown}>Age</InputLabel>
                <Select style={style.selectCategory}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        label="Kategorien"
                        onChange={handleChange}>
                    <MenuItem value={10}>Test2</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <TextField style={style.enterCategory}
                           id="outlined-basic" label="Kategorie hinzufügen" variant="outlined" />
            </FormControl>
        </div>
    )

}

export default InputAddQuestion;

const style = {
    inputQuestion: {
        display: "flex",
        padding: 0.75,
        paddingBottom: 2,
    },

    gridContainer: {
        display: "flex",
        justifyContent: "space-between"

    },
    answerField: {
        padding: 0.75,
        paddingBottom: 4,
        color: 'success.main',
    },

    formControlContainer: {
        display: "flex",
        alignContent: "space-between",
    },

    selectCategory: {
        margin: 4,
    },

    enterCategory: {
        margin: 4,
        color: 'success.main',
    }
}





