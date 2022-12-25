import './App.css';
import Backdrop from "./components/backdrop/Backdrop.js"
import Home from "./components/Home/Home.js" 
import { useState } from "react";

function App() {
  const [darkMode, setdarkMode] = useState(true);

  return (
    <div className="App">
      <Home darkMode = {darkMode}/>
      <Backdrop darkMode = {darkMode} changeDarkMode = {setdarkMode}/>
    </div>
  );
}

export default App;
