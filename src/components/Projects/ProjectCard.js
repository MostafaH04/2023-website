function ProjectCard(props)
{
    return(
        <div className = "projectCard">
            <div className = "content">
                <h1>{props.currProject.name}</h1>
                <p>{props.currProject.description}</p>
            </div>
            <img src = {props.currProject.imgSrc}/>
        </div>
    );
}

export default ProjectCard;