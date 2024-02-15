import React from 'react';

class ButtonContainer extends React.Component {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '1000'
        }}
      >
        <button
          className="button"
          style={{
            marginRight: '50px',
            backgroundColor: 'transparent',
            color: 'black',
            border: '1px solid white',
            padding: '10px 20px',
            borderRadius: '5px'
          }}
          onClick={() => window.location.href = 'datenschutz.html'}
        >
          Datenschutz
        </button>
        <button
          className="button"
          style={{
            marginRight: '50px',
            backgroundColor: 'transparent',
            color: 'black',
            border: '1px solid white',
            padding: '10px 20px',
            borderRadius: '5px'
          }}
          onClick={() => window.location.href = 'impressum.html'}
        >
          Impressum
        </button>
        <button
          className="button"
          style={{
            backgroundColor: 'transparent',
            color: 'black',
            border: '1px solid white',
            padding: '10px 20px',
            borderRadius: '5px'
          }}
          onClick={() => window.location.href = 'agb.html'}
        >
          AGBs
        </button>
      </div>
    );
  }
}

export default ButtonContainer;