import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import {useState} from "react";

function AddQuestion() {
    const [inputQuestion, setInputQuestion] = useState("")
    const [inputAnswerA, setAnswerA] = useState("")
    const [inputAnswerB, setAnswerB] = useState("")
    const [inputAnswerC, setAnswerC] = useState("")
    const [inputAnswerD, setAnswerD] = useState("")

    function handleChange(event, setterFunction) {
        setterFunction(event.target.value);
    }

    function handleSubmit() {
        console.log("Submitted from parent")

    }

    return (
        <>
            <h1 style={style.header}>Füge eine Frage hinzu</h1>
            <div style={style.componentContainer}>
                <FormAddQuestion buttonLabel={"Frage einreichen"} onSubmit={handleSubmit}/>
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
