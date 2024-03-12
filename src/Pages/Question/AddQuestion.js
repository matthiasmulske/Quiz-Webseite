import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import {useEffect, useState} from "react";

const domain = "http://localhost:5000";

function AddQuestion() {
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [validated, setValidated] = useState(null);
    const [data, setData] = useState();

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
                return categories;
            })
            .then((categories) => {
                setSelectedCategory(categories[0])
            })
            .catch((error) => {
                alert(error)
            });
    }, []);

    function handleDropdownChange(e) {
        setSelectedCategory(e.target.value)
    }

    function handleTextChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    function validateData() {
        const requiredKeys = ['answerA', 'question', 'answerB', 'answerC', 'correctAnswer'];
        const seenValues = [];

        if (!data) {
            setValidated(false);
            console.log("NO DATA")
            return;
        }

        for (const key of requiredKeys) {
            if (!data.hasOwnProperty(key) || typeof data[key] !== 'string' || data[key].trim() === '') {
                setValidated(false);
                console.log("DATA INVALID")
                return;
            }
            const value = data[key].trim();

            if (seenValues.includes(value)) {
                setValidated(false);
                console.log("DUPLICATE VALUE FOUND: ", value);
                return;
            }

            seenValues.push(value);
        }

        setValidated(true);
    }

    async function handleSubmit() {
        validateData()
        setData({
            ...data,
            selectedCategory: selectedCategory.QuestionCategoryID
        })
        console.log(data)
        if (validated) {
            await postToDatabase()
        }
    }

    async function postToDatabase() {
        try {
            const request = await fetch(domain + "/question", {
                method: "POST",
                body: JSON.stringify({
                    data
                }),
                headers: {"Content-Type": "application/json"},
            });

            if (!request.ok) {
                throw new Error('Failed to post question');
            }

            return request.json();
        } catch (error) {
            console.error('Error posting to Database:', error);
            throw error;
        }
    }


    return (
        <>
            <h1 style={style.header}>Füge eine Frage hinzu</h1>
            <div style={style.componentContainer}>
                <FormAddQuestion
                    onTextChange={handleTextChange}
                    buttonLabel={"Frage einreichen"}
                    onClick={handleSubmit}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onDropDownChange={handleDropdownChange}
                />
            </div >
        </>
    )
}

export default AddQuestion;

const style = {
    header: {
        textAlign: 'center',
        paddingTop: 10,
    },

    componentContainer: {
        width: "100%",
    },

}
