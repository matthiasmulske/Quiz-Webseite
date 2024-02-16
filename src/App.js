import EditQuestion from "./pages/EditQuestion";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={style.navbar}>NAVBAR PLACEHOLDER</h1>
      </header>
        <div style={style.page}>
            <EditQuestion/>
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
