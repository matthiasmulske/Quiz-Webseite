import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import {useEffect, useState} from "react";

const domain = "http://localhost:5000";

// TODO: add selectedCategory to data
// TODO: handleDropDownChange should return the categoryID

function AddQuestion() {
    let [categories, setCategories] = useState(null);
    let [selectedCategory, setSelectedCategory] = useState('');
    const [validated, setValidated] = useState(null);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
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
                throw error; // Propagate the error to handle it outside this function
            }
        };

        fetchData()
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

    function handleDropdownChange(event) {
        setSelectedCategory(event.target.value)
    };

    function handleTextChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    function validateSubmit(){
        const requiredKeys = ['answerA', 'question', 'answerB', 'answerC', 'correctAnswer'];

        for (const key of requiredKeys) {
            if (!data.hasOwnProperty(key) || typeof data[key] !== 'string' || data[key].trim() === '') {
                setValidated(false)
            }
        }
        setValidated(true)
    }

    async function handleSubmit() {
        validateSubmit()
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
            console.error('Error fetching categories:', error);
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
