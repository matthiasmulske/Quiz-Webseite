
import  LoginButton from "./../Atoms/LoginButton.js";
import Footer from "./../Components/Footer.js";

// TODO: Aufüllen. Hier ist sowas wie "LoginMask", "Button" etc.
function Login() {
    function startSinglePlayerGame() {
        alert("Starte Einzelspiel");
    }

    function startMultiPlayerGame() {
        alert("Starte Mehrspieler Spiel");
    }

    return(
        <>
            <LoginButton buttonLabel={"Einzelspieler"} onClick={startSinglePlayerGame}/>
            <LoginButton buttonLabel={"Mehrspieler"} onClick={startMultiPlayerGame}/>
            <Footer/>
        </>
    )

}

export default Login;

const style = {
    loginButtonContainer: {
        
    }
}
