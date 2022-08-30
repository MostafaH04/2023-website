import sceneryDark from './Scenery.svg';
import sceneryLight from './SceneryLight.svg';

function Home(props) {

    const sceneryStyle = {
        position: "fixed",
        width: "100vw",
        bottom: "-60px"
    }
    
    if (props.darkMode){
        return (
        <div className = "Home">
            <img src = {sceneryDark} style = {sceneryStyle}/>
        </div>
        );  
    }
    else {
        return(
            <div className = "Home">
                <img src = {sceneryLight} style = {sceneryStyle}/>
            </div>
        );
    }
}

export default Home;
