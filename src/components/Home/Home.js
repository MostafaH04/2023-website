import sceneryDark from './Scenery.svg';
import sceneryLight from './SceneryLight.svg';
import './Home.css';

function Home(props) {

    let arabicTextStyle = {
        color: "#3F4045"
    }
    
    let englishTextStyle = {
        color: "#FCFCFC"
    }

    let subTitleStyle = {
        color: "#feb31d"
    }

    const sceneryStyle = {
        position: "fixed",
        width: "100vw",
        bottom: "-60px",
        userSelect: "none"
    }

    let currentScenery;

    let menuType;

    if (props.darkMode){
        currentScenery = sceneryDark;
        englishTextStyle = {
            color: "#FCFCFC"
        }
        arabicTextStyle = {
            color: "#3F4045"
        }
        subTitleStyle = {
            color: "#feb31d"
        }
        menuType = "moon";
    }
    else{
        currentScenery = sceneryLight;
        englishTextStyle = {
            color: "#3D3D3D"
        }
        arabicTextStyle = {
            color: "#FFAD67"
        }
        subTitleStyle = {
            color: "#0D3B66"
        }
        menuType = "sun";
    }
    

    return (
        <div className = "home-section">
            <div className = "textHolder">
                <div className = "name">
                    <div className = "english">
                        <p style = {englishTextStyle}>MOSTAFA<br/>HUSSEIN</p>
                    </div>
                    <div classname = "arabic">
                        <p className = "typeArabic" style = {arabicTextStyle}>مصطفى <br/>حسين</p>
                    </div>
                    
                </div>
                <p className = "subTitle" style = {subTitleStyle}>Click the {menuType} for more info!</p>
            </div>
            <img src = {currentScenery} style = {sceneryStyle} />
        </div>
    );
    
}

export default Home;
