import './Project.css';
import {useState} from 'react'
import ProjectCard from './ProjectCard.js';
import Dot from './dot.js'
import buttonLeft from './Polygon 1.svg'
import buttonRight from './Polygon 2.svg'

function Projects(props)
{
    const [selector, setSelector] = useState(0);

    let projectList = [
        {
            name: "Chess Bot",
            description: "An autonomous chess playing robot built for the MTE 100/121 robot project that is relies on the stockfish 15 chess engine to make the best move.",
            imgSrc: "https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gMw9TkstBoWmanBWpVIzsO5CgvPOL4aS66GaFGRuR8m_33pYgITS1NNF8p93ZWnaudnjo8UqLwtEor_k7cvFUjIus8MZg=w1920-h937",
            link: "https://github.com/MostafaH04/Chess-Bot/wiki"
        },
        {
            name: "V8 Roomba",
            description: "(Work in progress) Managing a team of 6 students in the design and prototyping of an autonomous cleaning robot, currently built around three Arduinos that communicate over SPI and I2C.",
            imgSrc: "https://cdn.discordapp.com/attachments/1034262061577945100/1059751895985565746/image.png",
            link: "https://github.com/MostafaH04/V8-Roomba"
        },
        {
            name: "Guber",
            description: "Final project for the ICS4U0 course. A webapp made to provide more community cleanups and volunteering oppurtunities.",
            imgSrc: "https://camo.githubusercontent.com/8c6526bf2791554590ac7e709761d4910e24407605d47e1fdeaaea4dd196e9a9/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3838353630313439373133343533343639362f3933303833303736323333313232363134322f756e6b6e6f776e2e706e67",
            link: "https://github.com/SiddharthN16/Guber/wiki"
        },
        {
            name: "Magic Mouse",
            description: "Submission for Hack the North 2020++. Uses computer vision to allow for mouse control using hand movements.",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/1059754878894866532/image.png",
            link: "https://devpost.com/software/magic-mouse"
        },
        {
            name: "Monkey Host",
            description: "Submission for BananaHacks. A discord bot combined with computer vision and hardware sensors to help host events while maintaing saftey measures.",
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQErnlNRHhZ-Em-nyeGRi0xc414S2tvQ4JcbcPp7wekLmgHhgXHRwus7SUvAKyeme4idSM&usqp=CAU",
            link: "https://devpost.com/software/monkey-host"
        },
        {
            name: "Online Chess",
            description: "An an online chess application using pygame and firebase.",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/954095313679966238/unknown.png?width=645&height=671",
            link: "https://github.com/MostafaH04/Chess"
        },
        {
            name: "Batikha OS",
            description: "A replica of the MacOS UI, dubbed 'Batikha OS'. Made using processing for ICS2O0.",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/954096191287738388/unknown.png?width=1137&height=671",
            link: "https://github.com/MostafaH04/BatikhaOS"
        },
        {
            name: "PyBlock-3D",
            description: "A game made using pygame to simulate 3D rendering in python and to replicate the game minecraft to some extent.",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/954098374938886215/unknown.png?width=1145&height=671",
            link: "https://github.com/MostafaH04/3d-block-game"
        },
        {
            name: "Mask-On",
            description: "Sumbission for Neighborhood Hacks. A computer vision solution for stores to ensure guests are wearing a mask upon entering.",
            imgSrc: "https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_thumbnail_photos/001/513/930/datas/medium.png",
            link: "https://devpost.com/software/mask-on-a1ndpb"
        },
        {
            name: "Work Flow",
            description: "Sumbission for JAMHacks V. An application to measure productivity in terms of time on a computer.",
            imgSrc: "https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_thumbnail_photos/001/542/279/datas/medium.png",
            link: "https://devpost.com/software/time-flow"
        },
        {
            name: "Pong Launcher",
            description: "Built a projectile launcher for grade 12 physics class that could shoot a ping pong ball between 2 and 10 meters, accompanied by a custom predictive model using gradient descent to approximate distance based on launch angle.",
            imgSrc: "https://media.discordapp.net/attachments/388874244102160385/990621019578449960/unknown.png",
            link: "https://github.com/MostafaH04/Projectile-Launcher"
        },
        {
            name: "Movie System",
            description: "A mock ticketing system developed using pygame and firebase for the ICS3U0 course culminating project.",
            imgSrc: "https://camo.githubusercontent.com/d067c51e73f58a4e555e499fbb3647780357135dd154d88d85348af5ec0f6efb/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3338383837343234343130323136303338352f3939303630313130363131373736333037322f756e6b6e6f776e2e706e673f77696474683d373230266865696768743d343139",
            link: "https://github.com/MostafaH04/Theatre-Ticketing-system"
        }
    ];

    let contStyle = {}

    if (!props.darkMode)
    {
        contStyle = {
            background: "linear-gradient(180.01deg, rgba(190, 181, 163, 0.179) -9.62%, rgba(54, 177, 196, 0.94) 111.45%)",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.115), -25px 25px 105px -8px #0000004d"
        }
    }

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
            <div className = "projects-container" style = {contStyle}>
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