import React, { useState } from 'react';

function LoginButton({buttonLabel}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    
    return (
        <>
            <button
            label="test"
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-lg"
            style={{ width: '140px' }}>{buttonLabel}
            </button>
        </>
    )
}

export default LoginButton;