import './App.css';
import Backdrop from "./components/backdrop/Backdrop.js"
import Home from "./components/Home/Home.js" 
import { useState } from "react";

function App() {
  const [darkMode, setdarkMode] = useState(false);

  return (
    <div className="App">
      <Home darkMode = {darkMode}/>
      <Backdrop darkMode = {darkMode}/>
    </div>
  );
}

export default App;
