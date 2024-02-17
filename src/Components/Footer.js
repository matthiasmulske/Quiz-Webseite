import React from 'react';


// TODO: Benutze Funktionen, keine Klassen
class Footer extends React.Component {
  render() {
    return (
      <div className="fixed-bottom d-flex justify-content-center" style={{ zIndex: '1000' }}>
        <button
          className="btn btn-outline-dark mr-2 mb-3"
          onClick={() => window.location.href = 'datenschutz.html'}
        >
          Datenschutz
        </button>
        <button
          className="btn btn-outline-dark mr-2 mb-3"
          onClick={() => window.location.href = 'impressum.html'}
        >
          Impressum
        </button>
        <button
          className="btn btn-outline-dark mb-3"
          onClick={() => window.location.href = 'agb.html'}
        >
          AGBs
        </button>
      </div>
    );
  }
}

export default Footer;
