import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse.js";
import { BrowserRouter } from "react-router-dom";
import Button from "./Components/Button";
import ButtonsLogin from "./Components/ButtonsLogin";
import Footer from "./Components/Footer";
import LoginMaske from "./Components/LoginMaske";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
      <Button/>
      <Footer/>
    </BrowserRouter>
</React.StrictMode>,
);




  
