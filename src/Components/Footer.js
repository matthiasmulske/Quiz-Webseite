import React from "react";
import { Link } from "react-router-dom";

//function startDatenschutz() {
  //alert("Starte Datenschutz Seite");
//}

function starteAgbs() {
  alert("Starte AGBs Seite");
}

function addRechtliches() {
  alert("Starte Rechtliiche Seite");
}

function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Link to="/Datenschutzseite" style={{ marginRight: "10px" }}>
        Datenschutz
      </Link>
      <Link to="/Agbs" style={{ marginRight: "10px" }}>
        AGBs
      </Link>
      <Link to="Rechtliches" style={{ marginRight: "10px" }}>
        Rechtliches
      </Link>
    </div>
  );
}

export default Footer;
