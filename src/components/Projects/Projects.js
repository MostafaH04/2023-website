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
            description: "Developed a web application using React for the frontend and Firebase for the backend, aimed at providing more community cleanups and volunteering opportunities.",
            imgSrcs: ["https://i.postimg.cc/TYbnhsg3/image.webp",
            "https://i.postimg.cc/zB3gN2q5/image.webp",
            "https://i.postimg.cc/XJhyYKv5/image.webp"],
            link: "https://guber.pages.dev/"
        },
        {
            name: "PyBlock-3D",
            description: "Developed a game using Pygame to simulate 3D rendering in Python and replicate aspects of the game Minecraft.",
            imgSrcs: ["https://i.postimg.cc/qq3jGXDc/image.webp"],
            link: "https://github.com/MostafaH04/PyBlock-3D/wiki"
        },
        {
            name: "Work Flow",
            description: "Created an application, developed for JAMHacks V, that measures productivity in terms of time spent on a computer.",
            imgSrcs: ["https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/542/657/datas/gallery.jpg",
            "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/542/658/datas/gallery.jpg"],
            link: "https://devpost.com/software/time-flow"
        },
        {
            name: "Magic Mouse",
            description: "Hack the North 2020++ (during Covid). Created a program that uses a webcam to control a user's mouse using hand motions.",
            imgSrcs: ["https://raw.githubusercontent.com/MostafaH04/MagicMouse-HTN2021/master/magicmouse.png",
            "https://i.postimg.cc/05Fpkv64/image-1.png"],
            link: "https://magic-mouse.netlify.app/"
        }
    ];
    if (props.hardware)
    {
        projectList = [
            {
                name: "Robot Dog",
                description: "Building a robot dog that aims to utilize onboard cameras, LiDAR and sensors to navigate closed spaces autonomously. Using ROS2, STM32 and PyBullet.",
                imgSrcs: ["https://i.postimg.cc/59Y71b9H/image.png",
                "https://i.postimg.cc/027VMnwP/image.png",
                "https://i.postimg.cc/k5gsHdhg/image.png"            
                ],
                link: "https://github.com/MostafaH04/V8-Roomba/wiki"
            },
            {
                name: "Mobile Robot",
                description: "Currently working on the development of an autonomous cleaning robot utilizing advanced techniques such as sensor fusion and pose estimation.",
                imgSrcs: [
                "https://i.postimg.cc/MThYXfZn/image.png",
                "https://i.postimg.cc/kMbczswK/Roomba-Diagram.jpg"
                ],
                link: "https://github.com/MostafaH04/V8-Roomba/wiki"
            },
            {
                name: "6‐DOFenshmirtz Arm",
                description: "Designed a 6 DOF Robot Arm. Applied robot kinematics and wrote custom libraries for multiaxis stepper control.",
                imgSrcs: [
                "https://i.postimg.cc/5NW3VzkG/image.png",
                "https://github.com/MostafaH04/6-DOF-ARM/raw/main/artifacts/other/meme.png",
                "https://github.com/MostafaH04/6-DOF-ARM/raw/main/artifacts/altium/pcb_2.png"],
                link: "https://github.com/MostafaH04/6-DOF-ARM/wiki"
            },
            {
                name: "Chess Bot",
                description: "Developed an autonomous chess-playing robot for the MTE 100/121 robot project. Leveraged the powerful Stockfish 15 chess engine to make optimal moves.",
                imgSrcs: [
                "https://i.postimg.cc/Wbm7b4B4/image.png",
                "https://i.postimg.cc/Bvb5gBX8/image.png",
                "https://mir-s3-cdn-cf.behance.net/project_modules/disp/06dae3160377969.63b3a575570f1.jpg"]
                ,
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
