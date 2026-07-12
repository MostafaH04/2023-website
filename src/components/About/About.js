import './About.css';

import personalImg from './personal.png';
import sceneryImg1 from './Scenery.svg';
import sceneryImg2 from './SceneryLight.svg';

function About(props) {
    const sceneryImg = props.darkMode ? sceneryImg1 : sceneryImg2;

    return (
        <main className={`about-section page-shell ${props.darkMode ? 'about-dark' : 'about-light'}`}>
            <section className="about-copy" aria-labelledby="about-title">
                <p className="about-kicker">About Me</p>
                <h1 id="about-title">Hey, I'm Mostafa.</h1>
                <p className="about-lead">
                    I am a Mechatronics Engineering student at the University of Waterloo focused on automation, electromechanical systems, and robotics that can hold up outside the lab.
                </p>
                <p className="about-body">
                    My work sits between mechanical design, embedded systems, and software. I care about making systems feel intentional from the hardware architecture all the way to the interface someone uses to control it.
                </p>
                <div className="about-actions">
                    <a
                        href="https://drive.google.com/file/d/1a3I1CHtxwZnfcyMbPvrXwMktkEdkgcpv/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="resume-button"
                    >
                        View Resume
                    </a>
                </div>
            </section>

            <aside className="picture" aria-label="Portrait of Mostafa Hussein">
                <div className="picture-glow" />
                <img className="image-background" src={sceneryImg} alt="" aria-hidden="true" />
                <img className="personal-image" src={personalImg} alt="Mostafa Hussein" />
            </aside>
        </main>
    );
}

export default About;
