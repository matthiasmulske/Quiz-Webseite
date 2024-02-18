import React, { useState } from 'react';
import InputLogin from '../Atoms/InputLogin';
import LoginButton from '../Atoms/LoginButton';

// TODO: Styling aus src exkludieren
function LoginMaske() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSubmit() {
    //event.preventDefault();
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

  function handleRegister() {
    console.log('Registrierung für:', username, password);
  };

  if (isLoggedIn) {
    return <div>Eingeloggt als {username}</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <InputLogin inputPlaceholer={"Benutzername"}/>
      <InputLogin inputPlaceholer={"Passwort"}/>

      <div className="d-flex justify-content-between" style={{ width: '300px' }}>
        <LoginButton buttonLabel={"Anmelden"} onClick={handleSubmit}/>
        <LoginButton buttonLabel={"Registrieren"} onClick={handleRegister}/>
      </div>

      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default LoginMaske;