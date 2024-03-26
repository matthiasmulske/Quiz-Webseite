import EditQuestion from "./pages/Question/EditQuestion";
import AddQuestion from "./pages/Question/AddQuestion";
import { Routes, Route,} from "react-router-dom";
import PrivacyPolicyPage from "./pages/Startseite/PrivacyPolicyPage";
import Agbs from "./pages/Startseite/Agbs";
import Legal from "./pages/Startseite/Legal";
import Login from "./pages/Registration/Login";
import Homepage from "./pages/Startseite/Homepage";
import GameSetup from "./pages/Game/GameSetup";
import Game from "./pages/Game/Game";
import Navbar from "./components/Navbar";
import QuestionTakeOver from "./pages/Question/QuestionTakeOver";
import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  return (
    <div className="App">
      <Navbar
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      user = {user}
      setUser= {setUser}>
      </Navbar>
        <div style={style}>
        </div>
      <div style={style}></div>
      <Routes>
        <Route path="/AddQuestion" element={<AddQuestion/>} />
        <Route path="/" element={<Homepage isLoggedIn={isLoggedIn}/> } />
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/GameSetup" element={<GameSetup />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/PrivacyPolicyPage" element={<PrivacyPolicyPage />} />
        <Route path="/Agbs" element={<Agbs />} />
        <Route path="/Legal" element={<Legal />} />
        <Route path="/EditQuestion" element={<EditQuestion userID={3}/>} />
        <Route path="/QuestionTakeOver" element={<QuestionTakeOver user={user}/>} />
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

