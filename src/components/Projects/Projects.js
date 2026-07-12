import './Project.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard.js';
import Dot from './dot.js';
import buttonLeft from './Polygon 1.svg';
import buttonRight from './Polygon 2.svg';

const softwareProjects = [
    {
        name: "Guber",
        description: "A React and Firebase web app built to help communities organize cleanups and find local volunteering opportunities.",
        stack: ["React", "Firebase", "Community UX"],
        imgSrcs: [
            "https://i.postimg.cc/TYbnhsg3/image.webp",
            "https://i.postimg.cc/zB3gN2q5/image.webp",
            "https://i.postimg.cc/XJhyYKv5/image.webp"
        ],
        link: "https://guber.pages.dev/"
    },
    {
        name: "PyBlock-3D",
        description: "A Python game engine experiment that simulates 3D rendering with Pygame and recreates Minecraft-inspired world exploration.",
        stack: ["Python", "Pygame", "Rendering"],
        imgSrcs: ["https://i.postimg.cc/qq3jGXDc/image.webp"],
        link: "https://github.com/MostafaH04/PyBlock-3D/wiki"
    },
    {
        name: "Work Flow",
        description: "A JAMHacks V productivity app that turns computer activity into a clearer picture of focus, habits, and time usage.",
        stack: ["Productivity", "Analytics", "Hackathon"],
        imgSrcs: [
            "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/542/657/datas/gallery.jpg",
            "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/542/658/datas/gallery.jpg"
        ],
        link: "https://devpost.com/software/time-flow"
    },
    {
        name: "Magic Mouse",
        description: "A Hack the North project that uses webcam-based hand tracking to control a mouse through natural hand motions.",
        stack: ["Computer Vision", "Webcam", "Interaction"],
        imgSrcs: [
            "https://raw.githubusercontent.com/MostafaH04/MagicMouse-HTN2021/master/magicmouse.png",
            "https://i.postimg.cc/05Fpkv64/image-1.png"
        ],
        link: "https://magic-mouse.netlify.app/"
    }
];

const hardwareProjects = [
    {
        name: "Robot Dog",
        description: "A quadruped robotics platform using onboard cameras, LiDAR, sensors, ROS2, STM32, and PyBullet for autonomous indoor navigation.",
        stack: ["ROS2", "STM32", "PyBullet"],
        imgSrcs: [
            "https://i.postimg.cc/59Y71b9H/image.png",
            "https://i.postimg.cc/027VMnwP/image.png",
            "https://i.postimg.cc/k5gsHdhg/image.png"
        ],
        link: "https://github.com/MostafaH04/V8-Roomba/wiki"
    },
    {
        name: "Mobile Robot",
        description: "An autonomous cleaning robot project exploring sensor fusion, pose estimation, and practical mobile robot architecture.",
        stack: ["Sensor Fusion", "Localization", "Robotics"],
        imgSrcs: [
            "https://i.postimg.cc/MThYXfZn/image.png",
            "https://i.postimg.cc/kMbczswK/Roomba-Diagram.jpg"
        ],
        link: "https://github.com/MostafaH04/V8-Roomba/wiki"
    },
    {
        name: "6-DOFenshmirtz Arm",
        description: "A 6 DOF robot arm with custom kinematics work and libraries for coordinated multiaxis stepper motor control.",
        stack: ["Kinematics", "Stepper Control", "PCB Design"],
        imgSrcs: [
            "https://i.postimg.cc/5NW3VzkG/image.png",
            "https://github.com/MostafaH04/6-DOF-ARM/raw/main/artifacts/other/meme.png",
            "https://github.com/MostafaH04/6-DOF-ARM/raw/main/artifacts/altium/pcb_2.png"
        ],
        link: "https://github.com/MostafaH04/6-DOF-ARM/wiki"
    },
    {
        name: "Chess Bot",
        description: "An autonomous chess-playing robot built for MTE 100/121 that used Stockfish 15 to plan moves and a robot system to execute them.",
        stack: ["Mechanisms", "Stockfish", "Controls"],
        imgSrcs: [
            "https://i.postimg.cc/Wbm7b4B4/image.png",
            "https://i.postimg.cc/Bvb5gBX8/image.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/06dae3160377969.63b3a575570f1.jpg"
        ],
        link: "https://github.com/MostafaH04/Chess-Bot/wiki"
    }
];

function Projects(props) {
    const [selector, setSelector] = useState(0);
    const projectList = props.hardware ? hardwareProjects : softwareProjects;
    const activeProject = projectList[selector];

    useEffect(() => {
        setSelector(0);
    }, [props.hardware]);

    function showNext() {
        setSelector((current) => (current + 1) % projectList.length);
    }

    function showPrevious() {
        setSelector((current) => (current - 1 + projectList.length) % projectList.length);
    }

    return (
        <main className={`projects page-shell ${props.darkMode ? 'projects-dark' : 'projects-light'}`}>
            <section className="projects-heading" aria-labelledby="projects-title">
                <p className="projects-kicker">Selected Work</p>
                <h1 id="projects-title">{props.hardware ? 'Hardware Systems' : 'Software Projects'}</h1>
                <p>
                    A tighter look at projects where mechanical thinking, practical engineering, and software execution come together.
                </p>
                <div className="project-tabs" aria-label="Project category">
                    <Link className={!props.hardware ? 'active' : ''} to="/projects/software">Software</Link>
                    <Link className={props.hardware ? 'active' : ''} to="/projects/hardware">Hardware</Link>
                </div>
            </section>

            <section className="projects-stage" aria-label={`${props.hardware ? 'Hardware' : 'Software'} project carousel`}>
                <button className="project-nav project-prev" type="button" onClick={showPrevious} aria-label="Show previous project">
                    <img src={buttonLeft} alt="" aria-hidden="true" />
                </button>

                <div className="projects-container">
                    <ProjectCard currProject={activeProject} index={selector} count={projectList.length} />
                    <div className="dotCollection" aria-label="Project selector">
                        {projectList.map((project, index) => (
                            <Dot
                                key={project.name}
                                selected={index === selector}
                                label={`Show ${project.name}`}
                                onClick={() => setSelector(index)}
                            />
                        ))}
                    </div>
                </div>

                <button className="project-nav project-next" type="button" onClick={showNext} aria-label="Show next project">
                    <img src={buttonRight} alt="" aria-hidden="true" />
                </button>
            </section>
        </main>
    );
}

export default Projects;
