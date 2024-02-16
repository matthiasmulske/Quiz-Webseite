import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      isLoggedIn: false
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
    const { username, password } = this.state;

    
    const validUsername = 'user123';
    const validPassword = 'password123';

    
    if (username === validUsername && password === validPassword) {
      
      console.log('Anmeldung erfolgreich');
      this.setState({ isLoggedIn: true });
    } else {
      
      console.log('Anmeldung fehlgeschlagen');
      this.setState({ errorMessage: 'Benutzername oder Passwort ungültig' });
    }
  };

  handleRegister = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    // Hier könnte die Registrierungslogik implementiert werden
    console.log('Registrierung für:', username, password);
  };

  render() {
    if (this.state.isLoggedIn) {
      return <div>Eingeloggt als {this.state.username}</div>;
    }

    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <input
          type="text"
          placeholder="Benutzername"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          className="form-control mb-3"
          style={{ width: '300px' }}
        />

        <input
          type="password"
          placeholder="Passwort"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          className="form-control mb-3"
          style={{ width: '300px' }}
        />

        <div className="d-flex justify-content-between" style={{ width: '300px' }}>
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="btn btn-primary btn-lg"
            style={{ width: '140px' }}
          >
            Anmelden
          </button>

          <button
            type="submit"
            onClick={this.handleRegister}
            className="btn btn-success btn-lg"
            style={{ width: '140px' }}
          >
            Registrieren
          </button>
        </div>

        {this.state.errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {this.state.errorMessage}
          </div>
        )}
      </div>
    );
  }
}

export default Login;