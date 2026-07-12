import './App.css';
import Backdrop from "./components/backdrop/Backdrop.js";
import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";
import Project from "./components/Projects/Projects.js";
import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (event) => setDarkMode(event.matches);

    setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateTheme);

    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);

  return (
    <div className={`App ${darkMode ? 'app-dark' : 'app-light'}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home darkMode={darkMode} />} />
            <Route path="about" element={<About darkMode={darkMode} />} />
            <Route path="projects/software" element={<Project darkMode={darkMode} hardware={false} />} />
            <Route path="projects/hardware" element={<Project darkMode={darkMode} hardware={true} />} />
            <Route path="*" element={<Home darkMode={darkMode} />} />
          </Route>
        </Routes>
        <Backdrop darkMode={darkMode} changeDarkMode={setDarkMode} />
      </BrowserRouter>
    </div>
  );
}

export default App;
