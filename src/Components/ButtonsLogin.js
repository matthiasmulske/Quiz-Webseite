import React from 'react';

class ButtonComponent extends React.Component {
  handleNewQuestion = () => {
    console.log('Neue Quizfrage wurde angeklickt');
  };

  handleAnswerQuestion = () => {
    console.log('Quizfrage beantworten wurde angeklickt');
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-40vh' }}>
        {}
        <button
          style={{
            width: '200px',
            height: '50px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            marginBottom: '20px'
          }}
          onClick={this.handleNewQuestion}
        >
          Neue Quizfrage
        </button>

        {}
        <button
          style={{
            width: '200px',
            height: '50px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            marginBottom: '10px'
          }}
          onClick={this.handleAnswerQuestion}
        >
          Quizfrage beantworten
        </button>
      </div>
    );
  }
}

export default ButtonComponent;