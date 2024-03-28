import React from "react";
import { Link } from "react-router-dom";
import Nutzerhandbuch from "./../assets/Nutzerhandbuch.pdf";
import Betriebshandbuch from "./../assets/Betriebshandbuch.pdf";
import Systemdokumentation from "./../assets/Systemdokumentation.pdf";

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
        flexWrap: "wrap",
      }}
    >
      <Link to="/PrivacyPolicyPage" style={{ marginRight: "10px" }}>
        Datenschutz
      </Link>
      <Link to="/Agbs" style={{ marginRight: "10px" }}>
        AGBs
      </Link>
      <Link to="/Legal" style={{ marginRight: "10px" }}>
        Rechtliches
      </Link>
      <a href={Nutzerhandbuch} download style={{ marginRight: "10px" }}>
        Nutzerhandbuch
      </a>
      <a href={Betriebshandbuch} download style={{ marginRight: "10px" }}>
        Betriebshandbuch
      </a>
      <a href={Systemdokumentation} download style={{ marginRight: "10px" }}>
        Systemdokumentation
      </a>
    </div>
  );
}

export default Footer;
