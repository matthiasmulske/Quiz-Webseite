import { Routes, Route, Link } from "react-router-dom";
import Datenschutzseite from "./Pages/Datenschutzseite";
import Login from "./Pages/Login";
import Startseite from "./Pages/Startseite";
import StartseiteLogin from "./Pages/StartseiteLogin";

import { Route, Routes, Link } from "react-router-dom";
import Welcome from "./pages/Welcome";
import GameSetup from "./pages/GameSetup";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quizapp ISEF01</h1>
        <StartseiteLogin />
      </header>
      <Navbar>

      </Navbar>
      <Link className="nav-link" aria-current="page" to="/GameSetup">
        Game Setup
      </Link>
      <Link className="nav-link" aria-current="page" to="/Game">
        Game
      </Link>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/GameSetup" element={<GameSetup />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Datenschutzseite" element={<Datenschutzseite />} />
      </Routes>
    </div>
  );
}

export default App;
