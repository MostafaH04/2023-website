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
            "https://media.discordapp.net/attachments/388874244102160385/1059981342634410054/image.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/06dae3160377969.63b3a575570f1.jpg",
            "https://media.discordapp.net/attachments/772956476200583208/1060003763978506300/image.png?width=697&height=671"],
            link: "https://github.com/MostafaH04/Chess-Bot/wiki"
        },
        {
            name: "V8 Roomba",
            description: "Managing a team of 6 students in the design and prototyping of an autonomous cleaning robot, currently built around three Arduinos that communicate over SPI and I2C.",
            imgSrcs: ["https://cdn.discordapp.com/attachments/1034262061577945100/1059751895985565746/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1059983629251518494/image.png",
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
            name: "Mask-On",
            description: "Sumbission for Neighborhood Hacks. A computer vision solution for stores to ensure guests are wearing a mask upon entering.",
            imgSrcs: ["https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_thumbnail_photos/001/513/930/datas/medium.png",
            "https://media.discordapp.net/attachments/388874244102160385/1060011599118741574/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1060011831114092685/image.png"],
            link: "https://devpost.com/software/mask-on-a1ndpb"
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
            name: "Online Chess",
            description: "An an online chess application using pygame and firebase.",
            imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/954095313679966238/unknown.png?width=645&height=671",
            "https://media.discordapp.net/attachments/772956476200583208/1060001406293135561/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1060009464608075946/image.png"],
            link: "https://github.com/MostafaH04/Chess"
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
            name: "Me + Check",
            description: "A webapp that lets a user type in how they feel to generate an emoji representing their mood, done based on a custom trained model on the co:here api. Originally done for Hack the North 2022.",
            imgSrcs: ["https://media.discordapp.net/attachments/743258215612940339/1020807675581308939/unknown.png?width=1375&height=671",
            "https://media.discordapp.net/attachments/743258215612940339/1020803865500713030/unknown.png?width=1353&height=671",
            "https://media.discordapp.net/attachments/743258215612940339/1020576646392193064/unknown.png?width=1146&height=671"
            ],
            link: "https://github.com/MostafaH04/Me-Check"
        },
        {
            name: "Magic Mouse",
            description: "Submission for Hack the North 2020++. Uses computer vision to allow for mouse control using hand movements.",
            imgSrcs: ["https://raw.githubusercontent.com/MostafaH04/MagicMouse-HTN2021/master/magicmouse.png",
            "https://media.discordapp.net/attachments/388874244102160385/1059754878894866532/image.png",
            "https://media.discordapp.net/attachments/388874244102160385/1059995259221848084/image.png?width=947&height=671"],
            link: "https://devpost.com/software/magic-mouse"
        },
        {
            name: "Fraser Unicef",
            description: "Website for John Fraser's Fraser Unicef Club for the 2021-2022 year.",
            imgSrcs:[
                "https://media.discordapp.net/attachments/388874244102160385/1060023937821585428/image.png?width=1249&height=671",
                "https://media.discordapp.net/attachments/388874244102160385/1060023852417167420/image.png?width=853&height=671",
                "https://media.discordapp.net/attachments/388874244102160385/1060023795257200640/image.png"
            ]
        }
    ];
    if (props.hardware)
    {
        projectList = [
            {
                name: "Chess Bot",
                description: "An autonomous chess playing robot built for the MTE 100/121 robot project that is relies on the stockfish 15 chess engine to make the best move.",
                imgSrcs: [
                "https://media.discordapp.net/attachments/388874244102160385/1059981342634410054/image.png",
                "https://mir-s3-cdn-cf.behance.net/project_modules/disp/06dae3160377969.63b3a575570f1.jpg",
                "https://media.discordapp.net/attachments/772956476200583208/1060003763978506300/image.png?width=697&height=671"],
                link: "https://github.com/MostafaH04/Chess-Bot/wiki"
            },
            {
                name: "V8 Roomba",
                description: "Managing a team of 6 students in the design and prototyping of an autonomous cleaning robot, currently built around three Arduinos that communicate over SPI and I2C.",
                imgSrcs: ["https://cdn.discordapp.com/attachments/1034262061577945100/1059751895985565746/image.png",
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
            },
            {
                name: "Hand LEDs",
                description: "Using python serial communication along with computer vision to count number of raised fingers, which triggers the number of leds on.",
                imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/954121172793045022/184384776_944556336378446_5544735145185888494_n.png",
                "https://media.discordapp.net/attachments/388874244102160385/1060026910920409120/a41dd970-6e40-4e95-85f8-69e7416b3206.png",
                "https://media.discordapp.net/attachments/388874244102160385/1060026937873014864/a5f203d6-a0c6-4e6b-a843-c5e778d7cc71.png"],
                link: "https://github.com/MostafaH04/HandLEDS"
            },
            {
                name: "Fibonacci's Sequence",
                description: "After loading 1 and 1 into the 4-bit latchs (75HC75), then setting the input to 0, this circuit can count till 21 in fibonaci's sequence or up to 5 bits of info.",
                imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/954111886373306438/unknown.png?width=875&height=671",
                "https://media.discordapp.net/attachments/388874244102160385/954111886373306438/unknown.png?width=875&height=671",
                "https://media.discordapp.net/attachments/388874244102160385/954111886373306438/unknown.png?width=875&height=671"],
                link: "https://www.tinkercad.com/things/jyySCVgTl1N-copy-of-fibonaccis-sequence/editel?sharecode=SlSWuLGY1r-CTD76f5klwa0bXCT7u8pnPkeLNpW38nw"
            },
            {
                name: "Adder",
                description: "A 4 bit adder using 2 4-bit latch chips (74HC75) to store input, and a 4 bit adder chip (74HC283).",
                imgSrcs: ["https://media.discordapp.net/attachments/388874244102160385/954110579096834058/unknown.png?width=921&height=671",
                "https://media.discordapp.net/attachments/388874244102160385/954110579096834058/unknown.png?width=921&height=671",
                "https://media.discordapp.net/attachments/388874244102160385/954110579096834058/unknown.png?width=921&height=671"],
                link: "https://www.tinkercad.com/things/8jcnBbAUohb-copy-of-adder/editel?sharecode=bcwPGmi99soLrAtr4eT8KY1vZLGHGjjJYbRUkHRrNpA"
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
                name: "iPhone design",
                description: "A quick design to represent an iPhone 12's design, done for an AutoDesk Fusion 360 online course.",
                imgSrcs: ["https://cdn.discordapp.com/attachments/388874244102160385/990614627287179374/5d6424a5-6942-4dcb-8b0b-43477f3d5370.PNG",
                "https://media.discordapp.net/attachments/388874244102160385/1060028570220625930/image.png?width=730&height=671",
                "https://media.discordapp.net/attachments/388874244102160385/1060028343124242512/image.png?width=667&height=671"],
                link: "https://github.com/MostafaH04/Chess"
            },
            {
                name: "Rocket Wing",
                description: "A design for a wing of a bottled water rocket. The design broke the record for the lightest 3D printed wing.",
                imgSrcs: ["https://cdn.discordapp.com/attachments/388874244102160385/954136398607298570/unknown.png",
                "https://cdn.discordapp.com/attachments/388874244102160385/1060060680444723220/image.png",
                "https://media.discordapp.net/attachments/772956476200583208/1060062360208941116/image.png"],
                link: "https://www.tinkercad.com/things/7QLrGIzzu4H-rocket-wing"
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