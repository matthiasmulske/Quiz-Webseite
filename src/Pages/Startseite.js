import React from "react";
import LoginButton from "./../atoms/LoginButton.js";
import Footer from "./../components/Footer.js";

function Login() {
  function starteDasQuiz() {
    alert("Starte das Quiz");
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <LoginButton
          buttonLabel={"Starte Quiz"}
          onClick={starteDasQuiz}
          style={styles.button}
        />
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "500px",
    height: "120px",
    fontSize: "30px",
  },
  buttonSpace: {
    marginTop: "20px",
  },
};

export default Login;
