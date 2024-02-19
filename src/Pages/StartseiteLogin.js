import React from 'react';
import LoginButton from "./../Atoms/LoginButton.js";
import Footer from "./../Components/Footer.js";

function Login() {
    function startSinglePlayerGame() {
        alert("Starte Einzelspiel");
    }

    function startMultiPlayerGame() {
        alert("Starte Mehrspieler Spiel");
    }
    function addNewQuestion() {
        alert("Füge eine neue Quizfrage hinzu");
    }
    
    function editQuestion() {
        alert("Bearbeite eine Quizfrage");
    }

    return (
        <div style={styles.container}>
            <div style={styles.buttonContainer}>
                <LoginButton buttonLabel={"Einzelspieler"} onClick={startSinglePlayerGame} />
                <div style={styles.buttonSpace}></div> 
                <LoginButton buttonLabel={"Mehrspieler"} onClick={startMultiPlayerGame} />
                <div style={styles.buttonSpace}></div> 
                <LoginButton buttonLabel={"Neue Quizfrage"} onClick={addNewQuestion} />
                <div style={styles.buttonSpace}></div> 
                <LoginButton buttonLabel={"Quizfrage bearbeiten"} onClick={editQuestion} />
            </div>
            <Footer />
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    button: {
        width: '100%', 
        minWidth: '200px', 
        height: '80px', 
        fontSize: '24px', 
    },
    buttonSpace: {
        marginTop: '10px', 
    }
};

export default Login;