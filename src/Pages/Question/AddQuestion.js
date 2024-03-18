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
            Answer1: '',
            Answer2: '',
            Answer3: '',
            CorrectAnswer: '',
            Category: ''
        }
    );

    function handleDropDownChange(e) {
        setData({
            ...data,
            ['Category']: e.target.value,
        })
        setSelectedCategory(e.target.value)

    }

    function handleTextChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    function validateData() {
        console.log(data)
        const requiredKeys = ['Answer1', 'QuestionText', 'Answer2', 'Answer3', 'CorrectAnswer'];
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
        resolveData()
        if (validated) {
            await postToDatabase()
        }
    }

    function resolveData(){
        setData({
            ...data,
            Category: selectedCategory
        })
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
            console.log(data)

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
                    onDropDownChange={handleDropDownChange}
                    buttonLabel={"Frage einreichen"}
                    selectedCategory={selectedCategory}
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
