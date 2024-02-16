import {TextField} from "@mui/material";
import * as React from "react";



function InputAddQuestion() {
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
    }
}





