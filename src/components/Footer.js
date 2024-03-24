import React from "react";
import { Link } from "react-router-dom";


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
        flexWrap: "wrap"
         
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
      <a href={process.env.PUBLIC_URL + "/assets/pdf.pdf"} download style={{ marginRight: "10px" }}>
  Benutzerhandbuch
</a>
<a href={process.env.PUBLIC_URL + "/assets/pdf.pdf"} download style={{ marginRight: "10px" }}>
  Betriebshandbuch
</a>
<a href={process.env.PUBLIC_URL + "/assets/pdf.pdf"} download style={{ marginRight: "10px" }}>
  Systemdokumentation
</a>

    </div>
  );
}

export default Footer;
