import EditQuestion from "./pages/EditQuestion";
import AddQuestion from "./pages/AddQuestion";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={style.navbar}>NAVBAR PLACEHOLDER</h1>
      </header>
        <div style={style.page}>
            <AddQuestion/>
        </div>
    </div>
  )
}

export default App;


const style = {
    navbar: {
    },

    page: {
        margin: 8,

    }
}
