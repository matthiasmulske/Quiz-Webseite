import EditQuestion from "./pages/Question/EditQuestion";
import AddQuestion from "./pages/Question/AddQuestion";
import { Routes, Route,} from "react-router-dom";
import PrivacyPolicyPage from "./pages/Startseite/PrivacyPolicyPage";
import Agbs from "./pages/Startseite/Agbs";
import Legal from "./pages/Startseite/Legal";
import Login from "./pages/Registration/Login";
import Homepage from "./pages/Startseite/Homepage";
import HomepageLogin from "./pages/Registration/HomepageLogin";
//import Welcome from "./pages/Welcome";
import GameSetup from "./pages/Game/GameSetup";
import Game from "./pages/Game/Game";
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
        <Route path="/HomepageLogin" element={<HomepageLogin />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/GameSetup" element={<GameSetup />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/PrivacyPolicyPage" element={<PrivacyPolicyPage />} />
        <Route path="/Agbs" element={<Agbs />} />
        <Route path="/Legal" element={<Legal />} />
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
