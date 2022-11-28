import sceneryDark from './Scenery.svg';
import sceneryLight from './SceneryLight.svg';

function Home(props) {

    const sceneryStyle = {
        position: "fixed",
        width: "100vw",
        bottom: "-60px"
    }

    let currentScenery;

    if (props.darkMode){
        currentScenery = sceneryDark;
    }
    else{
        currentScenery = sceneryLight;
    }

    return (
        <div>
            <img src = {currentScenery} style = {sceneryStyle} />
        </div>
    );
    
}

export default Home;
