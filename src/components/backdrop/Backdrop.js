import './Backdrop.css';
import { useEffect, useMemo, useState } from 'react';
import { GrGithub, GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import birdImg1 from "./bird 2.svg";
import birdImg2 from "./bird 6.svg";
import birdImg3 from "./bird 9.svg";

const starPositions = [
    { width: '8px', left: '7%', top: '18%', animationDelay: '0.1s' },
    { width: '18px', left: '17%', top: '10%', animationDelay: '0.7s' },
    { width: '12px', left: '28%', top: '24%', animationDelay: '1.2s' },
    { width: '20px', left: '41%', top: '14%', animationDelay: '0.4s' },
    { width: '9px', left: '16%', top: '34%', animationDelay: '1.5s' },
    { width: '28px', left: '49%', top: '38%', animationDelay: '2s' },
    { width: '15px', left: '72%', top: '17%', animationDelay: '0.9s' },
    { width: '10px', left: '68%', top: '31%', animationDelay: '2.4s' },
    { width: '6px', left: '59%', top: '12%', animationDelay: '1.9s' },
    { width: '22px', left: '83%', top: '35%', animationDelay: '2.8s' },
    { width: '7px', left: '79%', top: '9%', animationDelay: '1.1s' }
];

const birdPositions = [
    { width: '44px', left: '7%', top: '18%', animationDelay: '0.2s' },
    { width: '38px', left: '18%', top: '12%', animationDelay: '0.8s' },
    { width: '36px', left: '29%', top: '25%', animationDelay: '1.4s' },
    { width: '42px', left: '43%', top: '15%', animationDelay: '0.5s' },
    { width: '78px', left: '15%', top: '36%', animationDelay: '1.8s' },
    { width: '62px', left: '51%', top: '39%', animationDelay: '2.2s' },
    { width: '34px', left: '73%', top: '18%', animationDelay: '1s' },
    { width: '48px', left: '67%', top: '33%', animationDelay: '2.5s' },
    { width: '58px', left: '60%', top: '13%', animationDelay: '2s' },
    { width: '45px', left: '84%', top: '36%', animationDelay: '2.9s' },
    { width: '54px', left: '80%', top: '10%', animationDelay: '1.3s' }
];

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Me', to: '/about' },
    { label: 'Software', to: '/projects/software' },
    { label: 'Hardware', to: '/projects/hardware' }
];

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/MostafaH04', icon: <GrGithub /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mostafa-hussein-04/', icon: <FaLinkedin /> },
    { label: 'Instagram', href: 'https://www.instagram.com/mostafah04/', icon: <GrInstagram /> }
];

function Backdrop(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const birdImgs = useMemo(() => [birdImg1, birdImg2, birdImg3], []);
    const themeClass = props.darkMode ? 'backdrop-dark' : 'backdrop-light';

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [menuOpen]);

    function changeMode() {
        props.changeDarkMode(!props.darkMode);
    }

    return (
        <div className={`backdrop-shell ${themeClass} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="ambient-layer" aria-hidden="true">
                <div className="celestial-glow" />
                {props.darkMode ? (
                    <div className="stars">
                        {starPositions.map((style, index) => (
                            <span className="circle" style={style} key={`star-${index}`} />
                        ))}
                    </div>
                ) : (
                    <div className="birds">
                        {birdPositions.map((style, index) => (
                            <img
                                className="bird"
                                style={style}
                                src={birdImgs[index % birdImgs.length]}
                                alt=""
                                key={`bird-${index}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <button
                className="celestial-toggle"
                type="button"
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                aria-label="Open navigation menu"
                onClick={() => setMenuOpen(true)}
            >
                <span className="celestial-core" />
                <span className="celestial-ring ring-one" />
                <span className="celestial-ring ring-two" />
            </button>

            <div
                className="menu-scrim"
                aria-hidden="true"
                onClick={() => setMenuOpen(false)}
            />

            <aside className="menu" id="site-menu" aria-label="Site navigation" aria-hidden={!menuOpen}>
                <div className="menu-topbar">
                    <button
                        className="theme-toggle"
                        type="button"
                        aria-label={`Switch to ${props.darkMode ? 'light' : 'dark'} mode`}
                        onClick={changeMode}
                    >
                        <span className="theme-track">
                            <span className="theme-thumb" />
                        </span>
                    </button>
                    <button
                        className="exitImg"
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={() => setMenuOpen(false)}
                    >
                        <span aria-hidden="true" />
                    </button>
                </div>

                <nav className="options">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={location.pathname === link.to ? 'menu-selector active' : 'menu-selector'}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="socials" aria-label="Social links">
                    {socialLinks.map((link) => (
                        <a
                            key={link.href}
                            className="menu-social"
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={link.label}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </aside>
        </div>
    );
}

export default Backdrop;
