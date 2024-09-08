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
            imgSrcs: ["https://media.discordapp.net/attachments/1034262061577945100/1282442329185194097/image.png?ex=66df5efd&is=66de0d7d&hm=bb433dfbd965e966e57ca4db30551280e837462047d00802617226bb7d4af382&=&format=webp&quality=lossless&width=398&height=671",
            "https://cdn.discordapp.com/attachments/1034262061577945100/1282442832241623142/image.png?ex=66df5f75&is=66de0df5&hm=20b7bad3fd2c43b69aa82e0045d31daff92f4a4682ba58ee0fb9de13c4bdddbf&",
            "https://media.discordapp.net/attachments/1034262061577945100/1282443321779945482/image.png?ex=66df5fea&is=66de0e6a&hm=b3b54f0d6234b6b6fed7eb7504ceee680d2aca50467fdff92c83efc60c7c242e&=&format=webp&quality=lossless&width=306&height=670"],
            link: "https://guber.pages.dev/"
        },
        {
            name: "PyBlock-3D",
            description: "Developed a game using Pygame to simulate 3D rendering in Python and replicate aspects of the game Minecraft. Demonstrated proficiency in game development, graphics programming, and simulation.",
            imgSrcs: ["https://cdn.discordapp.com/attachments/1034262061577945100/1282444358947442760/image.png?ex=66df60e1&is=66de0f61&hm=82323df9c8722cd1fac4084febc7b183c6130c52336f3d9cfedfe7b2040ec37f&"],
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
            name: "Magic Mouse",
            description: "Developed a computer vision-based solution, submitted for Hack the North 2020++, that enables mouse control through hand movements. Demonstrated proficiency in computer vision, gesture recognition, and hardware interfacing.",
            imgSrcs: ["https://raw.githubusercontent.com/MostafaH04/MagicMouse-HTN2021/master/magicmouse.png",
            "https://cdn.discordapp.com/attachments/1034262061577945100/1282444989074374697/image.png?ex=66df6178&is=66de0ff8&hm=a7cb7893b42a8f322a4fb3ec241b575bf198c1b1a7f518218d2eba2caac31d9a&"],
            link: "https://magic-mouse.netlify.app/"
        }
    ];
    if (props.hardware)
    {
        projectList = [
            {
                name: "Robot Dog",
                description: "Building a robot dog that aims to utilize onboard cameras, LiDAR and sensors to navigate closed spaces autonomously.",
                imgSrcs: ["https://cdn.discordapp.com/attachments/1034262061577945100/1282435706181910639/image.png?ex=66df58d2&is=66de0752&hm=8f62e2308f7e9ed37adea2ffdc953cc17ef60642a766ff1bbb1ceb6f1ad4ed0c&",
                "https://cdn.discordapp.com/attachments/1034262061577945100/1282435816001372282/image.png?ex=66df58ed&is=66de076d&hm=3e547789ecc78750c9c7f7a69972e9d21e659061f07ca64763c91727bec7e8eb&",
                "https://cdn.discordapp.com/attachments/1034262061577945100/1282427175080824905/image.png?ex=66df50e0&is=66ddff60&hm=2e21908dbc6c79cfe0149fcc87aa3c9e372ed657303fc8d2787ef8344755869f&"            
                ],
                link: "https://github.com/MostafaH04/V8-Roomba/wiki"
            },
            {
                name: "Mobile Robot",
                description: "Currently working on the development of an autonomous cleaning robot utilizing advanced techniques such as sensor fusion and pose estimation. Demonstrating expertise in robotics, perception, and control systems, with a focus on creating an efficient cleaning solution.",
                imgSrcs: [
                "https://cdn.discordapp.com/attachments/1034262061577945100/1282437397228945440/image.png?ex=66df5a66&is=66de08e6&hm=f86bebbb2b0cffc92d6bedc58c98bfda7df28c55902b0a3fae6db6297b4f722f&",
                "https://cdn.discordapp.com/attachments/1034262061577945100/1282437078172303390/Roomba_Diagram.jpg?ex=66df5a19&is=66de0899&hm=48d6e7b1b2e8f4bf1be1f13455f80c288fa5d69dac153401391bd252ff438e8a&"
                ],
                link: "https://github.com/MostafaH04/V8-Roomba/wiki"
            },
            {
                name: "6‐DOFenshmirtz Arm",
                description: "Designed a 6 DOF Robot Arm. Applied robot kinematics and wrote custom libraries for multiaxis stepper control, showcasing expertise in robotics, control systems, and embedded development.",
                imgSrcs: [
                "https://github.com/MostafaH04/6-DOF-ARM/raw/main/artifacts/other/meme.png",
                "https://github.com/MostafaH04/6-DOF-ARM/raw/main/artifacts/altium/pcb_2.png",
                "https://media.discordapp.net/attachments/1034262061577945100/1282440949875740792/image.png?ex=66df5db5&is=66de0c35&hm=b81cce4918b6c8c2c4b418fd46618525c3232fb73c63bbf029950d1b07d689b2&=&format=webp&quality=lossless&width=557&height=671"],
                link: "https://github.com/MostafaH04/6-DOF-ARM/wiki"
            },
            {
                name: "Chess Bot",
                description: "Developed an autonomous chess-playing robot for the MTE 100/121 robot project. Leveraged the powerful Stockfish 15 chess engine to make optimal moves, showcasing expertise in robotics, control systems, and integration of hardware and software.",
                imgSrcs: [
                "https://cdn.discordapp.com/attachments/1035715232624025641/1045867913061605456/IMG_7551.jpg?ex=66def2a5&is=66dda125&hm=5d02c010a279889b2946b26ab85ac7f02ebe0cbc2a2805ce0142d676bdc1d0ab&",
                "https://cdn.discordapp.com/attachments/1034262061577945100/1282439224431476757/image.png?ex=66df5c19&is=66de0a99&hm=19981e680524f0d1c445d093f2b61bf7ce88f3eea0d88d036b41f61f05ac11a9&",
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
