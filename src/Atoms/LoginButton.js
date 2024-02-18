import React, { useState } from 'react';

function LoginButton( {buttonLabel, onClick} ) {    
    return (
        <>
            <button
            label="test"
            type="submit"
            onClick={onClick}
            className="btn btn-primary btn-lg"
            style={{ width: '140px' }}>{buttonLabel}
            </button>
        </>
    )
}

export default LoginButton;