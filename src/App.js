import EditQuestion from "./Pages/Question/EditQuestion";
import AddQuestion from "./Pages/Question/AddQuestion";
import { Routes, Route,} from "react-router-dom";
import PrivacyPolicyPage from "./Pages/Startseite/PrivacyPolicyPage";
import Agbs from "./Pages/Startseite/Agbs";
import Legal from "./Pages/Startseite/Legal";
import Login from "./Pages/Registration/Login";
import LoginMaske from "./components/LoginMaske";
import Homepage from "./Pages/Startseite/Homepage";
import HomepageLogin from "./Pages/Registration/HomepageLogin";
import GameSetup from "./Pages/Game/GameSetup";
import Game from "./Pages/Game/Game";
import Navbar from "./components/Navbar";

function App() {


  return (
    <div className="App">
      <Navbar/>
        <div style={style}/>
      <div style={style}/>
      <Routes>
        <Route path="/EditQuestion" element={<EditQuestion />} />
        <Route path="/AddQuestion" element={<AddQuestion/>} />
        <Route path="/HomepageLogin" element={<HomepageLogin />} />
        <Route path="/" element={<Homepage/> } />
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginMaske" element={<LoginMaske />} />
        <Route path="/GameSetup" element={<GameSetup />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/PrivacyPolicyPage" element={<PrivacyPolicyPage />} />
        <Route path="/Agbs" element={<Agbs />} />
        <Route path="/Legal" element={<Legal />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/EditQuestion" element={<EditQuestion />} />
      </Routes>
    </div>
  );
}

export default App;

const style = {
  page: {
    margin: 8,
  },
};
