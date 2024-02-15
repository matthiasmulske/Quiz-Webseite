import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Button from "./Components/Button";





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Button/>
    <App/>
    <Footer/>
    <Header/>
</React.StrictMode>,
);



  
