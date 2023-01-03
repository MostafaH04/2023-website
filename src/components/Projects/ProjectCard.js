function ProjectCard(props)
{
    return(
        <div className = "projectCard">
            <div className = "content">
                <h1>{props.currProject.name}</h1>
                <p>{props.currProject.description}</p>
                <a className = "viewButton" href = {props.currProject.link} target = "_blank">View</a>
            </div>
            <img src = {props.currProject.imgSrc}/>
        </div>
    );
}

export default ProjectCard;