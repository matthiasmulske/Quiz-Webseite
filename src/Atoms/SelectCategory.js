import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React from "react";

const categories = {
}


function SelectCategory() {
    function handleChange() {
    }

    return (
        <>
            <FormControl style={style.container}>
                <InputLabel id="demo-simple-select-label" style={style.dropDown}>Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    label="Age"
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <TextField
                    id="outlined-basic" label="Kategorie hinzufügen" variant="outlined" />
            </FormControl>
        </>
    )

}

export default SelectCategory;

const style = {
    container: {
        maxHeight: 10,
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridRowGap: '10px',
    },

    dropDown: {
        //marginBottom: '100rem',
    }

};

