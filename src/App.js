import { Route, Routes, Link } from "react-router-dom";
import Welcome from "./pages/Welcome";
import GameSetup from "./pages/GameSetup";
import GameIntro from "./pages/GameIntro";
import GameQuestion from "./pages/GameQuestion";
import GameScoreboard from "./pages/GameScoreboard";

function App() {
  return (
    <div>
      <Link className="nav-link" aria-current="page" to="/GameView">
        GameView
      </Link>
      <Link className="nav-link" aria-current="page" to="/GameIntro">
        GameIntro
      </Link>
      <Link className="nav-link" aria-current="page" to="/GameQuestion">
        GameQuestion
      </Link>
      <Link className="nav-link" aria-current="page" to="/GameScoreboard">
        GameScoreboard
      </Link>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/GameView" element={<GameSetup />} />
        <Route path="/GameIntro" element={<GameIntro />} />
        <Route path="/GameQuestion" element={<GameQuestion />} />
        <Route path="/GameScoreboard" element={<GameScoreboard />} />
      </Routes>
    </div>
  );
}

export default App;
