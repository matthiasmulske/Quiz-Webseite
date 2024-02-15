import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '40vh' }}>
      {}
        <input
          type="text"
          placeholder="Benutzername"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          style={{
            marginBottom: '10px',
            width: '300px',
            height: '40px',
            border: '1px solid #ccc'
          }}
        />

        {}
        <input
          type="password"
          placeholder="Passwort"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          style={{
            marginBottom: '10px',
            width: '300px',
            height: '40px',
            border: '1px solid #ccc'
          }}
        />

        {}
        <button
          type="submit"
          onClick={this.handleSubmit}
          style={{
            width: '200px',
            height: '50px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px'
          }}
        >
          Anmelden
        </button>
      </div>
    );
  }
}

export default Login;