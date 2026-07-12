import { Link } from 'react-router-dom';
import sceneryDark from './Scenery.svg';
import sceneryLight from './SceneryLight.svg';
import './Home.css';

function Home(props) {
    const currentScenery = props.darkMode ? sceneryDark : sceneryLight;

    return (
        <main className={`home-section page-shell ${props.darkMode ? 'home-dark' : 'home-light'}`}>
            <section className="home-copy" aria-labelledby="home-title">
                <div className="home-kicker">Mechatronics Engineering / Robotics / Automation</div>
                <div className="name" id="home-title">
                    <div className="english" aria-label="Mostafa Hussein">
                        <span>MOSTAFA</span>
                        <span>HUSSEIN</span>
                    </div>
                    <div className="arabic" aria-hidden="true">
                        <span>مصطفى</span>
                        <span>حسين</span>
                    </div>
                </div>
                <p className="home-summary">
                    I build robotics systems, polished software, and automation tools that connect mechanical design with clean user experiences.
                </p>
                <div className="home-actions" aria-label="Primary navigation">
                    <Link className="home-action primary" to="/projects/hardware">Hardware Work</Link>
                    <Link className="home-action secondary" to="/projects/software">Software Work</Link>
                </div>
            </section>
            <img className="sceneryDrag" src={currentScenery} alt="" aria-hidden="true" />
        </main>
    );
}

export default Home;
