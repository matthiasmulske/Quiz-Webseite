import { Routes, Route, Link } from "react-router-dom";
import Datenschutzseite from "./pages/Datenschutzseite";
import Login from "./pages/Login";
import Startseite from "./pages/Startseite";
import StartseiteLogin from "./pages/StartseiteLogin";
import Welcome from "./pages/Welcome";
import GameSetup from "./pages/GameSetup";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar>

      </Navbar>
      <Link className="nav-link" aria-current="page" to="/GameSetup">
        Game Setup
      </Link>
      <Link className="nav-link" aria-current="page" to="/Game">
        Game
      </Link>
      <Routes>
        <Route path="/" element={<StartseiteLogin />} />
        <Route path="/GameSetup" element={<GameSetup />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Datenschutzseite" element={<Datenschutzseite />} />
      </Routes>
    </div>
  );
}

export default App;
