import EditQuestion from "./Pages/Question/EditQuestion";
import AddQuestion from "./Pages/Question/AddQuestion";
import { Routes, Route, Link } from "react-router-dom";
import Datenschutzseite from "./Pages/Startseite/Datenschutzseite";
import Agbs from "./Pages/Startseite/Agbs";
import Rechtliches from "./Pages/Startseite/Rechtliches";
import Login from "./Pages/Registration/Login";
import Startseite from "./Pages/Startseite/Startseite";
import StartseiteLogin from "./Pages/Registration/StartseiteLogin";
import Welcome from "./Pages/Welcome";
import GameSetup from "./Pages/Game/GameSetup";
import Game from "./Pages/Game/Game";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar>
      </Navbar>
        <div style={style}>
        </div>
      <Routes>
        <Route path="/EditQuestion" element={<EditQuestion />} />
        <Route path="/AddQuestion" element={<AddQuestion/>} />
        <Route path="/" element={<StartseiteLogin />} />
        <Route path="/GameSetup" element={<GameSetup />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Datenschutzseite" element={<Datenschutzseite />} />
        <Route path="/Agbs" element={<Agbs />} />
        <Route path="/Rechtliches" element={<Rechtliches />} />
        <Route path="/Game" element={<Game />} />
      </Routes>
    </div>
  )
}

export default App;

const style = {
    page: {
        margin: 8,


    }
}
