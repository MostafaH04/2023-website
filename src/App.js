import './App.css';
import Backdrop from "./components/backdrop/Backdrop.js"
import Home from "./components/Home/Home.js" 
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      <BrowserRouter >
      <Routes>
        <Route path="/">
          <Route index element={<Home darkMode = {darkMode}/>} /> // home route
          <Route path = "about" element={<Home darkMode = {darkMode}/>} /> // about route
          <Route path = "projects" element={<Home darkMode = {darkMode}/>} /> // projects route
          <Route path = "resume" element={<Home darkMode = {darkMode}/>} /> // resume route
          <Route path = "interest" element={<Home darkMode = {darkMode}/>} /> // interests route
          <Route path = "contact" element={<Home darkMode = {darkMode}/>} /> // contact me route
          
          <Route path="*" element={<Home darkMode = {darkMode}/>} /> // page-not-found route
        </Route>
      </Routes>
      <Backdrop darkMode = {darkMode} changeDarkMode = {setdarkMode}/>
    </BrowserRouter>
  </div>
  );
}

export default App;
