import './Backdrop.css';
import exitMenu from './Exit.svg';
import { useState } from 'react';

import { GrGithub, GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";

import lightMode from "./lightMode.svg";
import darkMode from "./darkMode.svg";

import birdImg1 from "./bird 2.svg";
import birdImg2 from "./bird 6.svg";
import birdImg3 from "./bird 9.svg";

import { Link } from "react-router-dom";

function Backdrop(props) {
    const [menuAnimation, setMenuAnimation] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [exitStyle, setExitStyle] = useState("");
    const [isClosing, setIsClosing] = useState(false);

    const MENU_CLOSE_MS = 1400;

    const birdImgs = [
        birdImg1, birdImg2, birdImg3
    ];

    const circles = [
        {
            width: `${10/14.4}vw`,
            height: `${10/14.4}vw`,
            left: `${72/14.4}vw`,
            top: `${110/10.24}vh`
        },
        {
            width: `${29/14.4}vw`,
            height: `${29/14.4}vw`,
            left: `${259/14.4}vw`,
            top: `${(61-15)/10.24}vh`
        },
        {
            width: `${19/14.4}vw`,
            height: `${19/14.4}vw`,
            left: `${365/14.4}vw`,
            top: `${(182-15)/10.24}vh`
        }
        ,
        {
            width: `${31/14.4}vw`,
            height: `${31/14.4}vw`,
            left: `${553/14.4}vw`,
            top: `${(106-15)/10.24}vh`
        },
        {
            width: `${12/14.4}vw`,
            height: `${12/14.4}vw`,
            left: `${150/14.4}vw`,
            top: `${(240-15)/10.24}vh`
        },
        {
            width: `${67/14.4}vw`,
            height: `${67/14.4}vw`,
            left: `${641/14.4}vw`,
            top: `${(263-15)/10.24}vh`
        },
        {
            width: `${24/14.4}vw`,
            height: `${24/14.4}vw`,
            left: `${965/14.4}vw`,
            top: `${(121-15)/10.24}vh`
        },
        {
            width: `${13/14.4}vw`,
            height: `${13/14.4}vw`,
            left: `${874/14.4}vw`,
            top: `${(212-15)/10.24}vh`
        },
        {
            width: `${7/14.4}vw`,
            height: `${7/14.4}vw`,
            left: `${764/14.4}vw`,
            top: `${(88-15)/10.24}vh`
        },
        {
            width: `${41/14.4}vw`,
            height: `${41/14.4}vw`,
            left: `${1129/14.4}vw`,
            top: `${(246-15)/10.24}vh`
        },
        {
            width: `${9/14.4}vw`,
            height: `${9/14.4}vw`,
            left: `${1072/14.4}vw`,
            top: `${(51-15)/10.24}vh`
        }
    ];

    const birds = [
        {
            width: `${35/14.4}vw`,
            left: `${72/14.4}vw`,
            top: `${110/10.24}vh`
        },
        {
            width: `${29/14.4}vw`,
            left: `${259/14.4}vw`,
            top: `${(61-15)/10.24}vh`
        },
        {
            width: `${28/14.4}vw`,
            left: `${365/14.4}vw`,
            top: `${(182-15)/10.24}vh`
        }
        ,
        {
            width: `${31/14.4}vw`,
            left: `${553/14.4}vw`,
            top: `${(106-15)/10.24}vh`
        },
        {
            width: `${72/14.4}vw`,
            left: `${150/14.4}vw`,
            top: `${(240-15)/10.24}vh`
        },
        {
            width: `${67/14.4}vw`,
            left: `${641/14.4}vw`,
            top: `${(263-15)/10.24}vh`
        },
        {
            width: `${24/14.4}vw`,
            left: `${965/14.4}vw`,
            top: `${(121-15)/10.24}vh`
        },
        {
            width: `${40/14.4}vw`,
            left: `${874/14.4}vw`,
            top: `${(212-15)/10.24}vh`
        },
        {
            width: `${52/14.4}vw`,
            left: `${764/14.4}vw`,
            top: `${(88-15)/10.24}vh`
        },
        {
            width: `${39/14.4}vw`,
            left: `${1129/14.4}vw`,
            top: `${(246-15)/10.24}vh`
        },
        {
            width: `${49/14.4}vw`,
            left: `${1072/14.4}vw`,
            top: `${(51-15)/10.24}vh`
        }
    ];

    let moonLightStyle = {
        zIndex: 1,
        width: `${2531/14.4}vw`,
        height:`${2531/14.4}vw`,
        right: `-${2531/28.8}vw`,
        top: `-${2531/28.8}vw`,
        background: "radial-gradient(50% 50% at 50% 50%, rgba(233, 233, 233, 0.24) 0%, rgba(233, 233, 233, 0) 100%)"
    };

    let sunLightStyle = {
        zIndex: 1,
        width: `${2531/14.4}vw`,
        height:`${2531/14.4}vw`,
        right: `-${2531/28.8}vw`,
        top: `-${2531/28.8}vw`,
        background: "radial-gradient(50% 50% at 50% 50%, rgba(244, 211, 94, 0.19) 0%, rgba(240, 219, 147, 0.11776) 75.52%, rgba(233, 233, 233, 0) 100%)"
    }

    let moon = [
        {
            zIndex: 15,
            width: `${424/14.4}vw`,
            height:`${424/14.4}vw`,
            right: `-${424/28.8}vw`,
            top: `-${424/28.8}vw`,
            background: "#E9E9E9",
            borderRadius: "50%"
        },
        {
            zIndex: 15,
            width: `${348/14.4}vw`,
            height:`${348/14.4}vw`,
            right: `-${348/28.8}vw`,
            top: `-${348/28.8}vw`,
            background: "#CFCFCF",
            borderRadius: "50%"
        },
        {
            zIndex: 15,
            width: `${305/14.4}vw`,
            height:`${305/14.4}vw`,
            right: `-${305/28.8}vw`,
            top: `-${305/28.8}vw`,
            background: "#AEAEAE",
            borderRadius: "50%"
        },
        {
            zIndex: 15,
            width: `${185/14.4}vw`,
            height:`${185/14.4}vw`,
            right: `-${185/28.8}vw`,
            top: `-${185/28.8}vw`,
            background: "#7E7E7E",
            borderRadius: "50%"
        }
    ];

    let sun = [
        {
            zIndex: 15,
            width: `${424/14.4}vw`,
            height:`${424/14.4}vw`,
            right: `-${424/28.8}vw`,
            top: `-${424/28.8}vw`,
            background: "#F4D35E",
            borderRadius: "50%"
        },
        {
            zIndex: 15,
            width: `${348/14.4}vw`,
            height:`${348/14.4}vw`,
            right: `-${348/28.8}vw`,
            top: `-${348/28.8}vw`,
            background: "#F1B555",
            borderRadius: "50%"
        },
        {
            zIndex: 15,
            width: `${305/14.4}vw`,
            height:`${305/14.4}vw`,
            right: `-${305/28.8}vw`,
            top: `-${305/28.8}vw`,
            background: "#EE964B",
            borderRadius: "50%"
        },
        {
            zIndex: 15,
            width: `${185/14.4}vw`,
            height:`${185/14.4}vw`,
            right: `-${185/28.8}vw`,
            top: `-${185/28.8}vw`,
            background: "#ff7345",
            borderRadius: "50%"
        }
    ];

    function getMoonFogClass(animation) {
        if (animation === "menu-animate") {
            return "moon fog-menu-animate-t fog-menu-animate";
        }
        if (animation === "menu-close-animate") {
            return "moon fog-menu-close-animate-t fog-menu-close-animate";
        }
        return "moon fog--t fog-";
    }

    function getSunFogClass(animation) {
        if (animation === "menu-animate") {
            return "sun fog-menu-animate-t sunfog-menu-animate";
        }
        if (animation === "menu-close-animate") {
            return "sun fog-menu-close-animate-t sunfog-menu-close-animate";
        }
        return "sun fog--t fog-";
    }

    function openMenu(){
        if (!menuOpen && !isClosing) {
            setMenuAnimation("menu-animate");
            setMenuOpen(true);
            setExitStyle("exitStyle");
        }
    }

    function closeMenu(){
        if (menuOpen && !isClosing){
            setIsClosing(true);
            setExitStyle("exitStyle closing");

            window.setTimeout(() => {
                setMenuAnimation("menu-close-animate");
            }, 250);

            window.setTimeout(() => {
                setMenuOpen(false);
                setExitStyle("");
                setMenuAnimation("");
                setIsClosing(false);
            }, MENU_CLOSE_MS);
        }
    }

    function changeMode()
    {
        props.changeDarkMode(!props.darkMode);
    }


    return (
        <div className={props.darkMode ? "backdrop-dark" : "backdrop-light"}>
            <div className={`menu ${exitStyle}`}>
                <a onClick={closeMenu} className={`exitImg ${exitStyle}`}>
                    <img src={exitMenu} alt="" />
                </a>
                <div
                    onClick={changeMode}
                    className={`modeToggle ${exitStyle} ${props.darkMode ? "dark" : "light"}`}
                >
                    <div className={`buttonCircle ${exitStyle}`}>
                        <img className="modeIcon darkIcon" src={darkMode} alt="" />
                        <img className="modeIcon lightIcon" src={lightMode} alt="" />
                    </div>
                </div>
                <div className="options">
                    <Link onClick={closeMenu} to="" className={`Home-page menu-selector ${exitStyle}`}>Home</Link>
                    <Link onClick={closeMenu} to="about" className={`About-page menu-selector ${exitStyle}`}>About Me</Link>
                    <Link onClick={closeMenu} to="projects/software" className={`Projects-page menu-selector ${exitStyle}`}>Software</Link>
                    <Link onClick={closeMenu} to="projects/hardware" className={`Projects-page menu-selector ${exitStyle}`}>Hardware</Link>
                </div>
                <div className="socials">
                    <a className={`menu-git menu-selector ${exitStyle}`} href="https://github.com/MostafaH04" target="_blank" rel="noreferrer">
                        <GrGithub />
                    </a>
                    <a className={`menu-linkedin menu-selector ${exitStyle}`} href="https://www.linkedin.com/in/mostafa-hussein-04/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                    <a className={`menu-ig menu-selector ${exitStyle}`} href="https://www.instagram.com/mostafah04/" target="_blank" rel="noreferrer">
                        <GrInstagram />
                    </a>
                </div>
            </div>

            {props.darkMode ? (
                <>
                    <div className={getMoonFogClass(menuAnimation)} style={moonLightStyle} onClick={closeMenu}></div>
                    <a className={`moon-group ${menuAnimation}`} onClick={openMenu}>
                        {moon.map((style, i) =>
                            <div key={i} className={`moon ${menuAnimation}`} style={style}></div>
                        )}
                    </a>
                    <div className="stars">
                        {circles.map((style, i) =>
                            <div key={i} className="circle" style={style}></div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className={getSunFogClass(menuAnimation)} style={sunLightStyle} onClick={closeMenu}></div>
                    <a className={`sun-group ${menuAnimation}`} onClick={openMenu}>
                        {sun.map((style, i) =>
                            <div key={i} className={`sun ${menuAnimation}`} style={style}></div>
                        )}
                    </a>
                    <div className="stars">
                        {birds.map((style, i) =>
                            <img key={i} className="bird" style={style} src={birdImgs[Math.floor(Math.random() * 2 + 1)]} alt="" />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Backdrop;
