import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse.js";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import ButtonsLogin from "./Components/ButtonsLogin";
import LoginMaske from "./Components/LoginMaske";
import Button from "./Components/Button";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
      <Footer/>
    </BrowserRouter>
</React.StrictMode>,
);




  
