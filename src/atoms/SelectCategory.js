import React, {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Select} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

const domain = "http://localhost:5000";

function SelectCategory({ onDropDownChange, selectedCategory }) {
    const [categories, setCategories] = useState([{Name: ''}]);

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
            })
            .catch((error) => {
                alert(error)
            });
    }, []);


    return (
        <FormControl style={style.dropDownField} fullWidth>
                <InputLabel>Kategorie</InputLabel>

                    <Select
                        value={selectedCategory}
                        label="Kategorie"
                        onChange={onDropDownChange}>
                        {categories.map((categoryItem) =>
                            <MenuItem
                                key={categoryItem.Name}
                                value={categoryItem.QuestionCategoryID}
                            >
                                {categoryItem.Name}
                            </MenuItem>)}
                    </Select>

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
