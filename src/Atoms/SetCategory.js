import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React from "react";

var exampleCategories = {
    categories: ["test", "test2"]
}

function SetCategory() {
    function handleChange() {
    }

    return (
        <>
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
        </>
    )

}

export default SetCategory;

const style = {
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


};

