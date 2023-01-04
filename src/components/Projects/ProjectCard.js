import { useState } from 'react'

function ProjectCard(props)
{
    const [selector, setSelector] = useState(0);

    function add()
    {
        setSelector((selector+1));
    }

    function add2()
    {
        setSelector((selector+2));
    }

    return(
        <div className = "projectCard">
            <div className = "content">
                <h1>{props.currProject.name}</h1>
                <p>{props.currProject.description}</p>
                <a className = "viewButton" href = {props.currProject.link} target = "_blank">View</a>
            </div>
            <div className = "imgCont">
                <img id = "one" onClick = {add} src = {props.currProject.imgSrcs[(selector+1)%3]}/>
                <img id = "two" onClick = {add2} src = {props.currProject.imgSrcs[(selector+2)%3]}/>
                <img id = "three" src = {props.currProject.imgSrcs[(selector)%3]}/>
            </div>
        </div>
    );
}

export default ProjectCard;