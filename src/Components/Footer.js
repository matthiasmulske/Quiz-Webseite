import React from 'react';
import { Link } from 'react-router-dom'; 


function startDatenschutz() {
  alert("Starte Datenschutz Seite");
}

function starteAgbs() {
  alert("Starte AGBs Seite");
}

function addImpressum() {
  alert("Starte Impressum Seite");
}


function Footer() {
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center' }}>
      <Link to="#" onClick={startDatenschutz} style={{ marginRight: '10px' }}>Datenschutz</Link>
      <Link to="#" onClick={starteAgbs} style={{ marginRight: '10px' }}>AGBs</Link>
      <Link to="#" onClick={addImpressum}>Impressum</Link>
    </div>
  );
}

export default Footer;