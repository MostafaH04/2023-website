import './App.css';
import Backdrop from "./components/backdrop/Backdrop.js"
import Home from "./components/Home/Home.js" 
import { useState } from "react";

function App() {
  const [darkMode, setdarkMode] = useState(true);

  let appStyle = {
    backgroundColor: "#02111B"
  }

  if (darkMode)
  {
    appStyle = {
      backgroundColor: "#02111B"
    }
  }
  else
  {
    appStyle = {
      background: "radial-gradient(141.67% 280.15% at 100% 4.25%, #FAF0CA 0%, #AFECFF 82.74%)"
    }
  }

  return (
    <div className="App" style = {appStyle}>
      <Home darkMode = {darkMode}/>
      <Backdrop darkMode = {darkMode} changeDarkMode = {setdarkMode}/>
    </div>
  );
}

export default App;
