import { useState } from 'react'

function ProjectCard(props)
{
    const [selector, setSelector] = useState(0);
    const [projectSave, setProjectSave] = useState(props.currProject.name);

    if (projectSave != props.currProject.name)
    {
        setSelector((0));
        setProjectSave(props.currProject.name)
    }

    function add()
    {
        setSelector((selector+1));
    }

    function add2()
    {
        setSelector((selector+2));
    }

    let numImgs = props.currProject.imgSrcs.length;

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
                <a className = "viewButton" href = {props.currProject.link} target = "_blank">View</a>
            </div>
            <div className = "imgCont">
                <img id = "one" onClick = {add} style = {styles[(selector+1)%3]} src = {props.currProject.imgSrcs[(selector+1)%3]}/>
                <img id = "two" onClick = {add2} style = {styles[(selector+2)%3]} src = {props.currProject.imgSrcs[(selector+2)%3]}/>
                <img id = "three" src = {props.currProject.imgSrcs[(selector)%3]}/>
            </div>
        </div>
    );
}

export default ProjectCard;