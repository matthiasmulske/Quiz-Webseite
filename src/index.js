import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Button from "./Components/Button";
import ButtonsLogin from "./Components/ButtonsLogin";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Button/>
    <ButtonsLogin/>
    <App/>
    <Footer/>
    <Header/>
</React.StrictMode>,
);



  
