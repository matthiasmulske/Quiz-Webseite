import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";


function AddQuestion() {

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
  return (
    <>
      <div style={style.componentContainer}>
        <FormAddQuestion buttonLabel={"Frage einreichen"} />
      </div>
    </>
  );
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
