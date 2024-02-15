import React from 'react';

class ButtonComponent extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            style={{
              width: '200px',
              height: '50px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginBottom: '20px'
            }}
            onClick={() => window.location.href = 'einzelspieler.html'}
          >
            Einzelspieler
          </button>
          <button
            style={{
              width: '200px',
              height: '50px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginBottom: '20px'
            }}
            onClick={() => window.location.href = 'mehrspieler.html'}
          >
            Mehrspieler
          </button>
        </div>
      </div>
    );
  }
}

export default ButtonComponent;