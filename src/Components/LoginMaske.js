import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function LoginMaske() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    if (username === 'test' && password === 'test123') {
      console.log('Anmeldung erfolgreich');
      window.location.href = '/HomepageLogin'; 
    } else {
      console.log('Anmeldung fehlgeschlagen');
      setErrorMessage('Benutzername oder Passwort ungültig');
    }
  }

  function handleRegister() {
    console.log("Registrierung für:", username, password);
    alert('Dies ist nur ein Prototyp. Aus diesem Grund funktioniert der Button nicht');
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
              <button type="submit" style={styles.button}>Anmelden</button>
              <button type="button" onClick={handleRegister} style={styles.button}>Registrieren</button>
            </div>
          </form>
        </div>
        {errorMessage && (
          <div style={styles.errorMessage}>{errorMessage}</div>
        )}
        {showMessage && (
          <div style={styles.messageContainer}>{registrationMessage}</div>
        )}
      </div>
      <div style={styles.linkContainer}>
        <Link to="/">Zurück zur Startseite</Link> 
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    position: 'relative', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
  loginContainer: {
    textAlign: 'center',
    width: '21%',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    position: 'relative', 
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  inputField: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
  messageContainer: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  linkContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
};

export default LoginMaske;