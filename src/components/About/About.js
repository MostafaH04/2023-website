import './About.css';

import { Link } from 'react-router-dom'

import personalImg from './personal.png'
import sceneryImg1 from './Scenery.svg'
import sceneryImg2 from './SceneryLight.svg'

function About(props)
{   
    let sceneryImg;
    let imageBackgroundStyle;

    let mainTextColor;
    let subTextColor;
    let buttonColor;
    if (props.darkMode)
    {
        sceneryImg = sceneryImg1;
        imageBackgroundStyle = {
            background: 'rgba(63, 64, 69, 0.54)'
        }
    }
    else
    {
        sceneryImg = sceneryImg2;
        imageBackgroundStyle = {
            background: 'rgba(238, 150, 75, 0.28)'
        }
        mainTextColor = {
            color: '#4C4B46'
        }
        subTextColor = {
            color: '#EE964B'
        }

        buttonColor = 'lightMode-color'
    }

    return (
        <div className = "about-section">
            <div className = "text">
                <h1 style = {mainTextColor}>HEY👋</h1>
                <h3 style = {mainTextColor}>
                    I am Mostafa, a Mechatronics<br />
                    Engineering student at the<br />
                    University of Waterloo<br />
                    interested in electromechnical<br />
                    systems and automation.
                </h3>
                <h3 className = "extra-text" style = {subTextColor}>
                    Keep scrolling to learn more<br/>about me!
                </h3>
                <a href = "https://drive.google.com/file/d/1a3I1CHtxwZnfcyMbPvrXwMktkEdkgcpv/view?usp=sharing" target = "_blank" className= {buttonColor}>my resume</a>
            </div>
            <div className = "picture" style = {imageBackgroundStyle}>
                <img className = "personal-image" src = {personalImg} />
                <img className = "image-background" src = {sceneryImg} />
            </div>
        </div>
    );
}

export default About;