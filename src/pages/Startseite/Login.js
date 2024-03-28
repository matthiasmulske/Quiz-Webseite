import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import GoogleButton from "react-google-button";
import AppleLogin from "react-apple-login";
import { useNavigate } from "react-router-dom";

function Login({ setUser, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line
  const [registrationMessage, setRegistrationMessage] = useState("");
  // eslint-disable-next-line
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    if (username === "test" && password === "test123") {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(3));
      setUser(3);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setErrorMessage("Benutzername oder Passwort ungültig");
    }
  }

  function handleRegister() {
    alert(
      "Dies ist nur ein Prototyp. Aus diesem Grund funktioniert der Button nicht",
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginContainer}>
        <h2>Login</h2>
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label>Benutzername:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Passwort:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputField}
              />
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>
                Anmelden
              </button>
              <button
                type="button"
                onClick={handleRegister}
                style={styles.button}
              >
                Registrieren
              </button>
            </div>
            <div style={buttonContainerStyle}>
              <GoogleButton
                onClick={handleRegister}
                style={googleButtonStyle}
              />
              <AppleLogin
                render={() => (
                  <button
                    type="button"
                    onClick={handleRegister}
                    style={appleButtonStyle}
                  >
                    <FontAwesomeIcon icon={faApple} style={logoStyle} />
                    <span style={textSpanStyle}>Sign in with Apple</span>
                  </button>
                )}
              />
            </div>
          </form>
        </div>
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        {showMessage && (
          <div style={styles.messageContainer}>{registrationMessage}</div>
        )}
      </div>
      <div style={styles.linkContainer}></div>
    </div>
  );
}

const googleButtonStyle = {
  backgroundColor: "transparent",
  color: "black",
  border: "none",
  padding: "30px 30px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "20px",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "10px",
};

const appleButtonStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "20px",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "20px",
};

const logoStyle = {
  width: "50px",
  height: "40px",
  marginRight: "5px",
};

const textSpanStyle = {
  marginLeft: "5px",
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
};
const styles = {
  pageContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "75vh",
    padding: "20px",
  },
  loginContainer: {
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    position: "relative",
    marginTop: "5px",
  },
  formGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  inputField: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  errorMessage: {
    color: "red",
    marginTop: "10px",
  },
  messageContainer: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  linkContainer: {
    position: "absolute",
    top: "20px",
    right: "20px",
  },
};

export default Login;
