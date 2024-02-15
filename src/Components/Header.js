import React from 'react';
import { Link } from 'react-router-dom';

class ButtonComponent extends React.Component {
  handleLoginClick = () => {
    <Link to="/neue_quizfrage">
        <button
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1000',
            backgroundColor: 'transparent',
            color: 'black',
            border: '1px solid white',
            padding: '10px 20px',
            borderRadius: '5px'
          }}
          className="button"
        >
          Login
        </button>
      </Link>
  };

  render() {
    return (
      <button
        className="button"
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: '1000',
          backgroundColor: 'transparent',
          color: 'black',
          border: '1px solid white',
          padding: '10px 20px',
          borderRadius: '5px'
        }}
        onClick={this.handleLoginClick}
      >
        Login
      </button>
    );
  }
}

export default ButtonComponent;