import React, { useState } from 'react';

function InputLogin({inputPlaceholer}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // TODO: Umbenennen (Funktion und value)
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
            <input
                type="text"
                placeholder={inputPlaceholer}
                value={username}
                onChange={handleUsernameChange}
                className="form-control mb-3"
                style={{ width: '300px' }}
            />      
    )
}


export default InputLogin;

