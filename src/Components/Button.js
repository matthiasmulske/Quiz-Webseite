import React from 'react';

class StartComponent extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="d-flex flex-column align-items-center">
          <button
            className="btn btn-primary btn-lg mb-3"
            onClick={() => window.location.href = 'einzelspieler.html'}
          >
            Einzelspieler
          </button>
          <button
            className="btn btn-primary btn-lg mb-3"
            onClick={() => window.location.href = 'mehrspieler.html'}
          >
            Mehrspieler
          </button>
        </div>
      </div>
    );
  }
}

export default StartComponent;