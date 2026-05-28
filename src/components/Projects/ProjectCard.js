import { useEffect, useState } from 'react'

function ProjectCard(props)
{
    const [selector, setSelector] = useState(0);
    const [isCompact, setIsCompact] = useState(false);
    const numImgs = props.currProject.imgSrcs.length;
    const getImage = (offset) => props.currProject.imgSrcs[(selector + offset) % numImgs];

    useEffect(() => {
        setSelector(0);
    }, [props.currProject.name]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        const updateCompact = () => setIsCompact(mediaQuery.matches);

        updateCompact();
        mediaQuery.addEventListener('change', updateCompact);

        return () => mediaQuery.removeEventListener('change', updateCompact);
    }, []);

    useEffect(() => {
        if (!isCompact || numImgs <= 1) {
            return undefined;
        }

        const interval = setInterval(() => {
            setSelector((prev) => (prev + 1) % numImgs);
        }, 4500);

        return () => clearInterval(interval);
    }, [isCompact, props.currProject.name, numImgs]);

    function add()
    {
        setSelector((selector + 1));
    }

    function add2()
    {
        setSelector((selector + 2));
    }

    let styles = [{}, {}, {}];

    if (numImgs < 2)
    {
        styles[1] = { display: 'none' };
        styles[2] = { display: 'none' };
    }
    else if (numImgs < 3)
    {
        styles[1] = {};
        styles[2] = { display: 'none' };
    }
    else
    {
        styles[1] = {};
        styles[2] = {};
    }

    return(
        <div className = "projectCard">
            <div className = "content">
                <h1>{props.currProject.name}</h1>
                <p>{props.currProject.description}</p>
                <a className = "viewButton" href = {props.currProject.link} target = "_blank" rel = "noreferrer">View</a>
            </div>
            <div className = "imgCont">
                <div className = "imgCont-desktop">
                    <img id = "one" onClick = {add} style = {styles[1]} src = {getImage(1)} alt = "" loading = "lazy" decoding = "async"/>
                    <img id = "two" onClick = {add2} style = {styles[2]} src = {getImage(2)} alt = "" loading = "lazy" decoding = "async"/>
                    <img id = "three" src = {getImage(0)} alt = {props.currProject.name} loading = "lazy" decoding = "async"/>
                </div>
                <div className = "imgCont-mobile">
                    {props.currProject.imgSrcs.map((src, index) => (
                        <img
                            key = {`${props.currProject.name}-mobile-${index}`}
                            className = {`mobile-image ${index === selector ? 'active' : ''}`}
                            src = {src}
                            alt = {`${props.currProject.name} screenshot ${index + 1}`}
                            loading = "lazy"
                            decoding = "async"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
