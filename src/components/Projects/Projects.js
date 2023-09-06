import './Project.css';
import {useState} from 'react'
import ProjectCard from './ProjectCard.js';
import Dot from './dot.js'
import buttonLeft from './Polygon 1.svg'
import buttonRight from './Polygon 2.svg'

function Projects(props)
{
    const [selector, setSelector] = useState(0);
    const [softwareState, setSoftwareState] = useState(false);

    if (props.hardware && softwareState)
    {
        setSelector(0);
        setSoftwareState(!props.hardware);
    }
    else if (!softwareState && !props.hardware)
    {
        setSelector(0);
        setSoftwareState(!props.hardware);
    }

    let projectList = [
        {
            name: "Guber",
            description: "Developed a web application using React for the frontend and Firebase for the backend, aimed at providing more community cleanups and volunteering opportunities. Demonstrated proficiency in frontend development, backend management, and creating interactive web experiences.",
            imgSrcs: ["https://camo.githubusercontent.com/8c6526bf2791554590ac7e709761d4910e24407605d47e1fdeaaea4dd196e9a9/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3838353630313439373133343533343639362f3933303833303736323333313232363134322f756e6b6e6f776e2e706e67",
            "https://media.discordapp.net/attachments/388874244102160385/1059992127926452334/image.png",
            "https://camo.githubusercontent.com/b72bdfa5cb7372c64afa3231985a819224f493a07dfa62eba41c8c0cba068a1b/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3838353630313439373133343533343639362f3933303833343039373939343038343433322f756e6b6e6f776e2e706e67"],
            link: "https://guber.pages.dev/"
        },
        {
            name: "PyBlock-3D",
            description: "Developed a game using Pygame to simulate 3D rendering in Python and replicate aspects of the game Minecraft. Demonstrated proficiency in game development, graphics programming, and simulation.",
            imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/954098374938886215/unknown.png?width=1145&height=671"],
            link: "https://github.com/MostafaH04/PyBlock-3D/wiki"
        },
        {
            name: "Work Flow",
            description: "Created an application, developed for JAMHacks V, that measures productivity in terms of time spent on a computer. Demonstrated proficiency in application development, data tracking, and productivity analysis.",
            imgSrcs: ["https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/542/657/datas/gallery.jpg",
            "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/542/658/datas/gallery.jpg"],
            link: "https://devpost.com/software/time-flow"
        },
        {
            name: "Pong Launcher",
            description: "Designed and constructed a projectile launcher for a grade 12 physics class, capable of shooting a ping pong ball between 2 and 10 meters. Developed a custom predictive model using gradient descent to approximate distance based on launch angle. Showcased proficiency in physics principles, modeling, and experimental design.",
            imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/990621019578449960/unknown.png",
            "https://cdn.discordapp.com/attachments/388874244102160385/1060012607630741644/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1060012398649552966/image.png"],
            link: "https://github.com/MostafaH04/Projectile-Launcher/wiki"
        },
        {
            name: "Monkey Host",
            description: "Developed a Discord bot integrated with computer vision and hardware sensors to assist in hosting events while maintaining safety measures. Demonstrated expertise in bot development, computer vision, and hardware integration.",
            imgSrcs: ["https://media.discordapp.net/attachments/853016980004929577/853347111755972698/unknown.png",
            "https://media.discordapp.net/attachments/853016980004929577/853346930809372732/unknown.png",
            "https://media.discordapp.net/attachments/853016980004929577/853115612833382420/unknown.png?width=946&height=671"],
            link: "https://devpost.com/software/monkey-host"
        },
        {
            name: "Movie System",
            description: "Developed a mock ticketing system using Pygame and Firebase, allowing users to sign up and log in to book fake movie tickets. Demonstrated proficiency in application development, user interface design, and backend integration.",
            imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/1060013115665829918/image.png?width=1151&height=671",
            "https://media.discordapp.net/attachments/388874244102160385/1060013257382952970/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1060013370885034004/image.png"],
            link: "https://github.com/MostafaH04/Theatre-Ticketing-system/wiki"
        },
        {
            name: "Magic Mouse",
            description: "Developed a computer vision-based solution, submitted for Hack the North 2020++, that enables mouse control through hand movements. Demonstrated proficiency in computer vision, gesture recognition, and hardware interfacing.",
            imgSrcs: ["https://raw.githubusercontent.com/MostafaH04/MagicMouse-HTN2021/master/magicmouse.png",
            "https://media.discordapp.net/attachments/388874244102160385/1059754878894866532/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1059995259221848084/image.png?width=947&height=671"],
            link: "https://magic-mouse.netlify.app/"
        }
    ];
    if (props.hardware)
    {
        projectList = [
            {
                name: "V8 - Roomba",
                description: "Currently working on the development of an autonomous cleaning robot utilizing advanced techniques such as sensor fusion and pose estimation. Demonstrating expertise in robotics, perception, and control systems, with a focus on creating an efficient cleaning solution.",
                imgSrcs: ["https://media.discordapp.net/attachments/1034262061577945100/1148242776849391616/image.png?width=1578&height=1184",
                "https://media.discordapp.net/attachments/388874244102160385/1088151072335466516/Render.jpg?width=2304&height=1058",
                "https://media.discordapp.net/attachments/388874244102160385/1118584890875719861/image.png?width=898&height=766"            
                ],
                link: "https://github.com/MostafaH04/V8-Roomba/wiki"
            },
            {
                name: "6-DOF Arm",
                description: "Designing a 6 DOF Robot Arm. Learning about and applying robot kinematics paired with writting custom libraries for stepper control, showcasing expertise in robotics, control systems, and embedded development.",
                imgSrcs: [
                "https://media.discordapp.net/attachments/1034262061577945100/1142468102035099690/image.png?width=979&height=881",
                "https://media.discordapp.net/attachments/1034262061577945100/1148243622295261254/image.png?width=1087&height=1182",
                "https://media.discordapp.net/attachments/1034262061577945100/1148243432406519828/image.png?width=1373&height=1184"],
                link: "https://github.com/MostafaH04/6-DOF-ARM/wiki"
            },
            {
                name: "Chess Bot",
                description: "Developed an autonomous chess-playing robot for the MTE 100/121 robot project. Leveraged the powerful Stockfish 15 chess engine to make optimal moves, showcasing expertise in robotics, control systems, and integration of hardware and software.",
                imgSrcs: [
                "https://media.discordapp.net/attachments/388874244102160385/1061527575396094034/chessbot3.png?width=1074&height=671",
                "https://mir-s3-cdn-cf.behance.net/project_modules/disp/06dae3160377969.63b3a575570f1.jpg",
                "https://media.discordapp.net/attachments/772956476200583208/1060003763978506300/image.png?width=697&height=671"],
                link: "https://github.com/MostafaH04/Chess-Bot/wiki"
            }
        ];
    }
    
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
