import './Project.css';
import {useState} from 'react'
import ProjectCard from './ProjectCard.js';
import Dot from './dot.js'
import buttonLeft from './Polygon 1.svg'
import buttonRight from './Polygon 2.svg'

function Projects()
{
    const [selector, setSelector] = useState(1);

    let projectList = [
        {
            name: "Project Name0",
            description: "Description about a project to test out how this would look for an actual project. So I am typing out anything to test this out. But realistically I would fortnite",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/954085502049476688/guber.png?width=1341&height=670"
        },
        {
            name: "Project Name1",
            description: "Description about a project to test out how this would look for an actual project. So I am typing out anything to test this out. But realistically I would fortnite",
            imgSrc: "https://raw.githubusercontent.com/MostafaH04/MagicMouse-HTN2021/master/magicmouse.png"
        },
        {
            name: "Project Name2",
            description: "Description about a project to test out how this would look for an actual project. So I am typing out anything to test this out. But realistically I would fortnite",
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQErnlNRHhZ-Em-nyeGRi0xc414S2tvQ4JcbcPp7wekLmgHhgXHRwus7SUvAKyeme4idSM&usqp=CAU"
        },
        {
            name: "Project Name3",
            description: "Description about a project to test out how this would look for an actual project. So I am typing out anything to test this out. But realistically I would fortnite",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/954095313679966238/unknown.png?width=645&height=671"
        },
        {
            name: "Project Name4",
            description: "Description about a project to test out how this would look for an actual project. So I am typing out anything to test this out. But realistically I would fortnite",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/954096191287738388/unknown.png?width=1137&height=671"
        },
        {
            name: "Project Name5",
            description: "Description about a project to test out how this would look for an actual project. So I am typing out anything to test this out. But realistically I would fortnite",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/954098374938886215/unknown.png?width=1145&height=671"
        },
        {
            name: "Project Name6",
            description: "Description about a project to test out how this would look for an actual project. So I am typing out anything to test this out. But realistically I would fortnite",
            imgSrc: "https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_thumbnail_photos/001/513/930/datas/medium.png"
        },
    ];


    function switchNum()
    {   
        if ((selector + 1) < projectList.length)
        {
            setSelector(selector+1);
        }
        else
        {
            setSelector(0);
        }
    }

    function switchNumB()
    {   
        if ((selector - 1) >= 0)
        {
            setSelector(selector-1);
        }
        else
        {
            setSelector(projectList.length-1);
        }
    }

    return (
        <div className = "projects">
            <img className = "one" style = {{zIndex: '30'}} onClick={switchNumB} src = {buttonLeft} />
            <div className = "projects-container">
                <ProjectCard currProject = {projectList[selector]}/>
                <div className = "dotCollection">
                {projectList.map((user, i)=> (
                    <Dot selected = {i == selector}/>
                ))}
                </div>
            </div>
            <img className = "two" style = {{zIndex: '30'}} onClick={switchNum} src = {buttonRight}/>
        </div>
    );
}

export default Projects;