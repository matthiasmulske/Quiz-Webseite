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
        <Link to="/GameSetup" style={styles.link}>
          <LoginButton
            buttonLabel={"Starte Quiz"}
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
    display: "grid",
    placeItems: "center",
    height: "80vh",
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
  link: {
    textDecoration: "none", 
  },
};

export default Login;

