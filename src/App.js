import AddQuestion from "./Pages/AddQuestion";
import EditQuestion from "./Pages/EditQuestion";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={style.navbar}>NAVBAR PLACEHOLDER</h1>
      </header>
        <AddQuestion/>
    </div>
  )
}

export default App;


const style = {
    navbar: {
    }
}
