import { Routes, Route, Link } from "react-router-dom";
import Datenschutzseite from "./Pages/Datenschutzseite";
import Login from "./Pages/Login";
import Startseite from "./Pages/Startseite";
import StartseiteLogin from "./Pages/StartseiteLogin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quizapp ISEF01</h1>
        <StartseiteLogin />
      </header>
      <Routes>
        <Route path="/Datenschutzseite" element={<Datenschutzseite />} />
      </Routes>
    </div>
  );
}

export default App;
