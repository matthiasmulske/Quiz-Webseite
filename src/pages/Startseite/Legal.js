import React from "react";
import { Link } from "react-router-dom";

function Legal() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading1}>Rechtliches</h1>
      <h2 id="m716" style={styles.heading2}>
        Dieses ist eine Arbeit von Studierenden der IU International University
        of Applied Sciences
      </h2>
      <p></p>
      <p style={styles.paragraph}>
        Namen der Studierenden:
        <p></p>
        <ul style={styles.list}>
          <li>Nadja Klaus</li>
          <li>Sarah Hehn</li>
          <li>Lucas Wankerl</li>
          <li>Matthias Mulske</li>
        </ul>
      </p>
      <p style={styles.paragraph}>
        Hierbei handelt es sich um ein nicht-kommerzielles Projekt
      </p>
      <div style={styles.linkContainer}>
        <Link to="/">Zurück zur Startseite</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    lineHeight: "2",
    padding: "20px",
  },
  heading1: {
    fontSize: "50px",
    marginTop: "0",
  },
  heading2: {
    fontSize: "20px",
    marginTop: "20px",
  },
  paragraph: {
    fontSize: "16px",
  },
  list: {
    listStyleType: "disc",
    marginLeft: "20px",
    margin: "0",
  },
  linkContainer: {
    position: "absolute",
    top: "100px",
    right: "20px",
  },
};

export default Legal;
