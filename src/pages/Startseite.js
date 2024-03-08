import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../../atoms/LoginButton.js";
import Footer from "../../components/Footer.js";

function Login() {
  function starteDasQuiz() {
    alert("Starte das Quiz");
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <Link to="/Game">
          <LoginButton
            buttonLabel={"Starte Quiz"}
            onClick={starteDasQuiz}
            style={styles.button}
          />
        </Link>
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
    height: "500px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "250px",
  },
  
  buttonSpace: {
    marginTop: "20px",
  },
};

export default Login;
