import sceneryDark from './Scenery.svg';
import sceneryLight from './SceneryLight.svg';
import './Home.css';

function Home(props) {

    var arabicTextStyle = {
        color: "#3F4045"
    }
    
    var englishTextStyle = {
        color: "#FCFCFC"
    }

    const sceneryStyle = {
        position: "fixed",
        width: "100vw",
        bottom: "-60px",
        userSelect: "none"
    }

    let currentScenery;

    if (props.darkMode){
        currentScenery = sceneryDark;
        englishTextStyle = {
            color: "#FCFCFC"
        }
        arabicTextStyle = {
            color: "#3F4045"
        }
    }
    else{
        currentScenery = sceneryLight;
        englishTextStyle = {
            color: "#3D3D3D"
        }
        arabicTextStyle = {
            color: "#FFAD67"
        }
    }

    return (
        <div>
            <div className = "name">
                <div className = "english" style = {englishTextStyle}>
                    MOSTAFA<br/>HUSSEIN
                </div>
                <div classname = "arabic">
                    <p className = "typeArabic" style = {arabicTextStyle}>مصطفى <br/>حسين</p>
                </div>
            </div>
            <img src = {currentScenery} style = {sceneryStyle} />
        </div>
    );
    
}

export default Home;
