import React from 'react';

function startDatenschutz() {
  alert("Starte Datenschutz Seite");
}

function starteAgbs() {
  alert("Starte AGBs Seite");
}

function addImpressum() {
  alert("Starte Impressum Seite");
}

// TODO: Buttons in Links verwandeln
function Footer() {
  /*
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center' }}>
      <Button label="Datenschutz" onClick={startDatenschutz} style={{ marginRight: '10px' }} />
      <Button label="AGBs" onClick={starteAgbs} style={{ marginRight: '10px' }} />
      <Button label="Impressum" onClick={addImpressum} />
    </div>
    );
  */
}

export default Footer;