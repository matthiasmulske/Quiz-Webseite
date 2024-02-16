import { Route, Routes, Link } from "react-router-dom";
import Welcome from "./pages/Welcome";
import GameSetup from "./pages/GameSetup";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
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
      </Routes>
    </div>
  );
}

export default App;
