import { Route, Routes, Link } from "react-router-dom";
import Welcome from "./pages/Welcome";
import GameSetup from "./pages/GameSetup";
import Game from "./pages/Game";
import TestModal from "./atoms/TestModal";

function App() {
  return (
    <div>
      <Link className="nav-link" aria-current="page" to="/GameSetup">
        Game Setup
      </Link>
        <Link className="nav-link" aria-current="page" to="/TestModal">
            TestModal
        </Link>
        <Link className="nav-link" aria-current="page" to="/Game">
            Game
        </Link>
        <div style={style}>
            <Routes>
                <Route path="/TestModal" element={<TestModal />} />
                <Route path="/GameSetup" element={<GameSetup />} />
                <Route path="/Game" element={<Game />} />
            </Routes>
        </div>
    </div>
  );
}

export default App;

const style = {
}
