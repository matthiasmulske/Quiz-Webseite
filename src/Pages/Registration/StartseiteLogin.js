import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../../atoms/LoginButton.js";
import Footer from "../../components/Footer.js";

function Login() {
  
  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
      <Link to="/GameSetup">
        <LoginButton 
          buttonLabel={"Starte Quiz"}  
          style={styles.button} />
        </Link>
        <Link to="/AddQuestion">
        <LoginButton 
          buttonLabel={"Neue Quizfrage"} 
          style={styles.button} />
        </Link>
        <Link to="/EditQuestion">
        <LoginButton 
          buttonLabel={"Quizfrage bearbeiten"} 
          style={styles.button} />
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
};

export default Login;