import './App.css';
import logo from './assets/img/logo.png'
import Search from './components/search/index'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Search></Search>
      </header>
    </div>
  );
}

export default App;
