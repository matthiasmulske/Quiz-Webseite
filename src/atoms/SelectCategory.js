import React, {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Select} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

const domain = "http://localhost:5000";

const testCategories = [
    {QuestionCategoryID: 1, Name: 'A'},
    {QuestionCategoryID: 2, Name: 'B'},
    {QuestionCategoryID: 3, Name: 'C'},
    {QuestionCategoryID: 4, Name: 'D'},
    {QuestionCategoryID: 5, Name: 'E'},
]


function SelectCategory({ onDropDownChange, selectedCategory }) {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(domain + "/categories", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                return response.json();
            } catch (error) {
                console.error('Error fetching categories:', error);
                throw error;
            }
        };

        fetchCategories()
            .then((categories) => {
                setCategories(categories);
                return categories
            })
            .then((categories) => {
                console.log(categories)
            })
            .catch((error) => {
                alert(error)
            });
    }, []);

    function findCategoryByID(id) {
        let ct = testCategories.find(category => category.QuestionCategoryID === id)
        console.log(ct.QuestionCategoryID)
        return ct
    }


    return (
        <FormControl style={style.dropDownField} fullWidth>
                <InputLabel>Kategorie</InputLabel>
                {testCategories != null ? (
                    <Select
                        value={findCategoryByID(selectedCategory)}
                        label="Kategorie"
                        onChange={onDropDownChange}>
                        {testCategories.map((testCategory) =>
                            <MenuItem
                                key={findCategoryByID(testCategory.QuestionCategoryID).QuestionCategoryID}
                                value={findCategoryByID(testCategory.QuestionCategoryID)}>
                                {findCategoryByID(testCategory.QuestionCategoryID).Name}
                            </MenuItem>)}
                    </Select>
                ) : (console.log(''))}
        </FormControl>
    );
}

export default SelectCategory;

const style = {
    dropDownField: {
        paddingBottom: '30px',
        color: 'success.main',
    },
}
