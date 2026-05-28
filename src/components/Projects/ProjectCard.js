import { useEffect, useState } from 'react'

function ProjectCard(props)
{
    const [selector, setSelector] = useState(0);

    useEffect(() => {
        setSelector(0);
    }, [props.currProject.name]);

    function add()
    {
        setSelector((selector+1));
    }

    function add2()
    {
        setSelector((selector+2));
    }

    let numImgs = props.currProject.imgSrcs.length;
    const getImage = (offset) => props.currProject.imgSrcs[(selector + offset) % numImgs];

    let styles = [{},{},{}];

    if (numImgs < 2)
    {
        styles[1] = {
            display: 'none'
        };
        styles[2] = {
            display: 'none'
        };
    }
    else if (numImgs < 3)
    {
        styles[1] = {};
        styles[2] = {
            display: 'none'
        };
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
                <img id = "one" onClick = {add} style = {styles[1]} src = {getImage(1)} alt = "" loading = "lazy" decoding = "async"/>
                <img id = "two" onClick = {add2} style = {styles[2]} src = {getImage(2)} alt = "" loading = "lazy" decoding = "async"/>
                <img id = "three" src = {getImage(0)} alt = {props.currProject.name} loading = "lazy" decoding = "async"/>
            </div>
        </div>
    );
}

export default ProjectCard;