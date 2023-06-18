import './App.css';
import Backdrop from "./components/backdrop/Backdrop.js"
import Home from "./components/Home/Home.js" 
import About from "./components/About/About.js"
import Project from "./components/Projects/Projects.js"
import Interest from "./components/interest/Interest.js"
import { useState, useEffect} from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [darkMode, setdarkMode] = useState(true);

  useEffect(() => {
    // Add listener to update styles
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setdarkMode(e.matches ? true : false));
  
    // Setup dark/light mode for the first time
    setdarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false)
  
    // Remove listener
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
      });
    }
  }, []);

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
      <BrowserRouter >
      <Routes>
        <Route path="/">
          <Route index element={<Home darkMode = {darkMode}/>} /> // home route
          <Route path = "about" element={<About darkMode = {darkMode}/>} /> // about route
          <Route path = "projects/software" element={<Project darkMode = {darkMode} hardware = {false}/>} /> // projects route
          <Route path = "projects/hardware" element={<Project darkMode = {darkMode} hardware = {true}/>} /> // projects route
          
          <Route path="*" element={<Home darkMode = {darkMode}/>} /> // page-not-found route
        </Route>
      </Routes>
      <Backdrop darkMode = {darkMode} changeDarkMode = {setdarkMode}/>
    </BrowserRouter>
  </div>
  );
}

export default App;
