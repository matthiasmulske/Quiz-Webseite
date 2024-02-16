import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse.js";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
      <Header/>
    </BrowserRouter>
</React.StrictMode>,
);



  
