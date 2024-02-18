import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validUsername = 'user123';
    const validPassword = 'password123';

    if (username === validUsername && password === validPassword) {
      console.log('Anmeldung erfolgreich');
      setIsLoggedIn(true);
    } else {
      console.log('Anmeldung fehlgeschlagen');
      setErrorMessage('Benutzername oder Passwort ungültig');
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // Hier könnte die Registrierungslogik implementiert werden
    console.log('Registrierung für:', username, password);
  };

  if (isLoggedIn) {
    return <div>Eingeloggt als {username}</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <input
        type="text"
        placeholder="Benutzername"
        value={username}
        onChange={handleUsernameChange}
        className="form-control mb-3"
        style={{ width: '300px' }}
      />

      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={handlePasswordChange}
        className="form-control mb-3"
        style={{ width: '300px' }}
      />

      <div className="d-flex justify-content-between" style={{ width: '300px' }}>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary btn-lg"
          style={{ width: '140px' }}
        >
          Anmelden
        </button>

        <button
          type="submit"
          onClick={handleRegister}
          className="btn btn-success btn-lg"
          style={{ width: '140px' }}
        >
          Registrieren
        </button>
      </div>

      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Login;