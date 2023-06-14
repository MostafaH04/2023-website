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
            imgSrcs: [
            "https://media.discordapp.net/attachments/388874244102160385/1061527575396094034/chessbot3.png?width=1074&height=671",
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/06dae3160377969.63b3a575570f1.jpg",
            "https://media.discordapp.net/attachments/772956476200583208/1060003763978506300/image.png?width=697&height=671"],
            link: "https://github.com/MostafaH04/Chess-Bot/wiki"
        },
        {
            name: "V8 Roomba",
            description: "Building an autonomous cleaning robot, using techniques like sensor fusion and pose estimation.",
            imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/1088151072335466516/Render.jpg?width=2304&height=1058",
            "https://media.discordapp.net/attachments/388874244102160385/1118584890875719861/image.png?width=898&height=766",
            "https://cdn.discordapp.com/attachments/388874244102160385/1060341301146562690/image.png"
            ],
            link: "https://github.com/MostafaH04/V8-Roomba"
        },
        {
            name: "Guber",
            description: "A webapp made to provide more community cleanups and volunteering oppurtunities built with a react frontend and firebase to manage the backend.",
            imgSrcs: ["https://camo.githubusercontent.com/8c6526bf2791554590ac7e709761d4910e24407605d47e1fdeaaea4dd196e9a9/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3838353630313439373133343533343639362f3933303833303736323333313232363134322f756e6b6e6f776e2e706e67",
            "https://media.discordapp.net/attachments/388874244102160385/1059992127926452334/image.png",
            "https://camo.githubusercontent.com/b72bdfa5cb7372c64afa3231985a819224f493a07dfa62eba41c8c0cba068a1b/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3838353630313439373133343533343639362f3933303833343039373939343038343433322f756e6b6e6f776e2e706e67"],
            link: "https://github.com/SiddharthN16/Guber/wiki"
        },
        {
            name: "Pong Launcher",
            description: "Built a projectile launcher for grade 12 physics class that could shoot a ping pong ball between 2 and 10 meters, accompanied by a custom predictive model using gradient descent to approximate distance based on launch angle.",
            imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/990621019578449960/unknown.png",
            "https://cdn.discordapp.com/attachments/388874244102160385/1060012607630741644/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1060012398649552966/image.png"],
            link: "https://github.com/MostafaH04/Projectile-Launcher"
        },
        {
            name: "Monkey Host",
            description: "Submission for BananaHacks. A discord bot combined with computer vision and hardware sensors to help host events while maintaing saftey measures.",
            imgSrcs: ["https://media.discordapp.net/attachments/853016980004929577/853347111755972698/unknown.png",
            "https://media.discordapp.net/attachments/853016980004929577/853346930809372732/unknown.png",
            "https://media.discordapp.net/attachments/853016980004929577/853115612833382420/unknown.png?width=946&height=671"],
            link: "https://devpost.com/software/monkey-host"
        },
        {
            name: "PyBlock-3D",
            description: "A game made using pygame to simulate 3D rendering in python and to replicate the game minecraft to some extent.",
            imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/954098374938886215/unknown.png?width=1145&height=671",
            "https://media.discordapp.net/attachments/388874244102160385/954098374938886215/unknown.png?width=1145&height=671",
            "https://media.discordapp.net/attachments/388874244102160385/954098374938886215/unknown.png?width=1145&height=671"],
            link: "https://github.com/MostafaH04/3d-block-game"
        },
        {
            name: "Work Flow",
            description: "Sumbission for JAMHacks V. An application to measure productivity in terms of time on a computer.",
            imgSrcs: ["https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_thumbnail_photos/001/542/279/datas/medium.png",
            "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/542/657/datas/gallery.jpg",
            "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/542/658/datas/gallery.jpg"],
            link: "https://devpost.com/software/time-flow"
        },
        {
            name: "Movie System",
            description: "A mock ticketing system developed using pygame and firebase, allowing users to sign up and log in to book fake movie tickets.",
            imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/1060013115665829918/image.png?width=1151&height=671",
            "https://media.discordapp.net/attachments/388874244102160385/1060013257382952970/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1060013370885034004/image.png"],
            link: "https://github.com/MostafaH04/Theatre-Ticketing-system"
        },
        {
            name: "Magic Mouse",
            description: "Submission for Hack the North 2020++. Uses computer vision to allow for mouse control using hand movements.",
            imgSrcs: ["https://raw.githubusercontent.com/MostafaH04/MagicMouse-HTN2021/master/magicmouse.png",
            "https://media.discordapp.net/attachments/388874244102160385/1059754878894866532/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1059995259221848084/image.png?width=947&height=671"],
            link: "https://devpost.com/software/magic-mouse"
        }
    ];
    if (props.hardware)
    {
        projectList = [
            {
                name: "Chess Bot",
                description: "An autonomous chess playing robot built for the MTE 100/121 robot project that is relies on the stockfish 15 chess engine to make the best move.",
                imgSrcs: [
                "https://media.discordapp.net/attachments/388874244102160385/1061527575396094034/chessbot3.png?width=1074&height=671",
                "https://mir-s3-cdn-cf.behance.net/project_modules/disp/06dae3160377969.63b3a575570f1.jpg",
                "https://media.discordapp.net/attachments/772956476200583208/1060003763978506300/image.png?width=697&height=671"],
                link: "https://github.com/MostafaH04/Chess-Bot/wiki"
            },
            {
                name: "V8 Roomba",
                description: "Managing a team of 6 students in the design and prototyping of an autonomous cleaning robot, currently built around three Arduinos that communicate over SPI and I2C.",
                imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/1088151072335466516/Render.jpg?width=2304&height=1058",
                "https://media.discordapp.net/attachments/388874244102160385/1059983629251518494/image.png",
                "https://cdn.discordapp.com/attachments/388874244102160385/1060341301146562690/image.png"
                ],
                link: "https://github.com/MostafaH04/V8-Roomba"
            },
            {
                name: "Sumo Bot",
                description: "Sumo bot based around the parralax sumo bot kit, which uses a microbit. This was the culminating project for the interfacing unit for the grade 12 Computer Engineering course.",
                imgSrcs: ["https://cdn.discordapp.com/attachments/388874244102160385/990624711597768714/unknown.png",
                "https://cdn.discordapp.com/attachments/388874244102160385/1060021407767068783/image.png",
                "https://media.discordapp.net/attachments/388874244102160385/1060021437206888578/image.png"],
                link: "https://github.com/MostafaH04/Sumo-Bot"
            },
            {
                name: "Sound Vision",
                description: "Project for University of Waterloo Design for All program. Which uses an ultrasonic sensor and a servo to help those visually impaired or people working in the dark.",
                imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/1060025387813458021/image.png",
                "https://media.discordapp.net/attachments/388874244102160385/954134698395828234/unknown.png?width=906&height=671",
                "https://media.discordapp.net/attachments/388874244102160385/1060024631119061012/image.png"],
                link: "https://github.com/MostafaH04/Projectile-Launcher"
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
