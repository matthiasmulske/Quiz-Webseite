import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import { useState } from "react";
import {Alert} from "@mui/material";

const domain = "http://localhost:5000";

let defaultState =         {
    QuestionText: '',
    Answer1: '',
    Answer2: '',
    Answer3: '',
    CorrectAnswer: '',
    Category: ''
}


function AddQuestion() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [submitMessage, setSubmitMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [data, setData] = useState(defaultState);

    function handleDropDownChange(e) {
        setData({
            ...data,
            ['Category']: e.target.value,
        })
        setSelectedCategory(e.target.value)

    }

    function handleTextChange(e) {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function validateData() {
        const requiredKeys = ['Answer1', 'QuestionText', 'Answer2', 'Answer3', 'CorrectAnswer'];
        const seenValues = [];
        console.log(data)

        for (const key of requiredKeys) {
            console.log(key)
            if (!data.hasOwnProperty(key) || typeof data[key] !== 'string' || data[key].trim() === '') {
                setSeverity("error")
                setSubmitMessage("Du musst alle Felder ausfüllen")
                setShowMessage(true)
                return;
            }
            const value = data[key].trim();

            if (seenValues.includes(value)) {
                setSubmitMessage("Eingegebene Daten dürfen nicht identisch sein: " + value);
                setSeverity("error")
                setShowMessage(true)
                return;
            }

            seenValues.push(value);
        }
        setSeverity("success")
    }

    async function handleSubmit() {
        setShowMessage(false)
        validateData()
        resolveData()
        if (severity === "success") {
            await postToDatabase()
            setSubmitMessage("Frage wurde erfolgreich dem Pool hinzugefügt")
            setSeverity("success")
            setShowMessage(true)
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

                {showMessage &&
                    <Alert severity={severity}>
                        {submitMessage}
                    </Alert>}

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