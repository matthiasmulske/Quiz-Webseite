import EditQuestion from "./pages/Question/EditQuestion";
import AddQuestion from "./pages/Question/AddQuestion";
import { Routes, Route, Link } from "react-router-dom";
import Datenschutzseite from "./pages/Startseite/Datenschutzseite";
import Agbs from "./pages/Startseite/Agbs";
import Rechtliches from "./pages/Startseite/Rechtliches";
import Login from "./pages/Registration/Login";
import Startseite from "./pages/Startseite/Startseite";
import StartseiteLogin from "./pages/Registration/StartseiteLogin";
import Welcome from "./pages/Welcome";
import GameSetup from "./pages/Game/GameSetup";
import Game from "./pages/Game/Game";
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
        <div style={style}>
        </div>
      <Link className="nav-link" aria-current="page" to="/EditQuestion">
        EditQuestion
      </Link>
      <Routes>
        <Route path="/EditQuestion" element={<EditQuestion />} />
        <Route path="/" element={<StartseiteLogin />} />
        <Route path="/GameSetup" element={<GameSetup />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Datenschutzseite" element={<Datenschutzseite />} />
        <Route path="/Agbs" element={<Agbs />} />
        <Route path="/Rechtliches" element={<Rechtliches />} />
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
