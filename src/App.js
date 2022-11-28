import './App.css';
import Backdrop from "./components/backdrop/Backdrop.js"
import Home from "./components/Home/Home.js" 
import { useState } from "react";

function App() {
  const [darkMode, setdarkMode] = useState(true);

  return (
    <div className="App">
      <Backdrop darkMode = {darkMode}/>
      <Home darkMode = {darkMode}/>
    </div>
  );
}

export default App;
