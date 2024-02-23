import React from "react";
import LoginButton from "../../atoms/LoginButton.js";
import Footer from "../../components/Footer.js";

function Login() {
  function startSpiel() {
    alert("Starte das Quiz");
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
        <LoginButton buttonLabel={"Spiel Starten"} onClick={startSpiel} style={styles.button} />
        <LoginButton buttonLabel={"Neue Quizfrage"} onClick={addNewQuestion} style={styles.button} />
        <LoginButton buttonLabel={"Quizfrage bearbeiten"} onClick={editQuestion} style={styles.button} />
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
  },
  buttonContainer: {
    display: "grid",
    gridGap: "10px", 
  },
  button: {
    width: "100%",
    minWidth: "200px",
    height: "100px",
    fontSize: "24px",
  },
};

export default Login;