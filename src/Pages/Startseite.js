import React from 'react';
import LoginButton from "./../Atoms/LoginButton.js";
import Footer from "./../Components/Footer.js";

function Login() {
    function startSpielStarten() {
        alert("Starte das Spiel");
    }


    return (
        <div style={styles.container}>
            <div style={styles.buttonContainer}>
                <LoginButton buttonLabel={"Spiel Starten"} onClick={startSpielStarten} style={styles.button} />
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
        width: '500px', 
        height: '120px', 
        fontSize: '30px', 
    },
    buttonSpace: {
        marginTop: '20px', 
    }
};

export default Login;