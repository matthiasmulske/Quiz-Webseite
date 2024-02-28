import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputLogin from "../atoms/InputLogin";
import LoginButton from "../atoms/LoginButton";

function LoginMaske() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const validUsername = "user123";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
      console.log("Anmeldung erfolgreich");
      setIsLoggedIn(true);
    } else {
      console.log("Anmeldung fehlgeschlagen");
      setErrorMessage("Benutzername oder Passwort ungültig");
    }
  }

  function handleRegister() {
    console.log("Registrierung für:", username, password);
  }

  if (isLoggedIn) {
    return <div>Eingeloggt als {username}</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center justify-content-center mt-5"
    >
      <InputLogin
        inputPlaceholder="Benutzername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputLogin
        inputPlaceholder="Passwort"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <Link to="/HomepageLogin">
          <LoginButton buttonLabel={"Anmelden"} type="submit" />
        </Link>
        <Link to="/">
          <LoginButton buttonLabel={"Registrieren"} type="button" onClick={handleRegister} />
        </Link>
      </div>

      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
    </form>
  );
}

export default LoginMaske;