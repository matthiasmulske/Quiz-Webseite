import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import {useState} from "react";

function AddQuestion() {
    const [data, setData] = useState({
        question: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
    });


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
                <FormAddQuestion data={data} buttonLabel={"Frage einreichen"} onSubmit={handleSubmit}/>
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
