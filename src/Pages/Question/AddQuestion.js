import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import {useEffect, useState} from "react";

const domain = "http://localhost:5000";


function AddQuestion() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [validated, setValidated] = useState(null);
    const [data, setData] = useState(
        {
            QuestionText: '',
            AnswerA: '',
            AnswerB: '',
            AnswerC: '',
            CorrectAnswer: '',
            CategoryID: 2
        }
    );

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
        const requiredKeys = ['AnswerA', 'QuestionText', 'AnswerB', 'AnswerC', 'CorrectAnswer'];
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
            QuestionCategoryID: selectedCategory.QuestionCategoryID
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
                    onClick={handleSubmit}
                    onDropDownChange={handleDropdownChange}
                    buttonLabel={"Frage einreichen"}
                    defaultValues={data}
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
