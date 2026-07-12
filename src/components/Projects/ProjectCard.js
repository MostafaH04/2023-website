import { useEffect, useState } from 'react';

function ProjectCard(props) {
    const [imageIndex, setImageIndex] = useState(0);
    const images = props.currProject.imgSrcs;
    const activeImage = images[imageIndex % images.length];

    useEffect(() => {
        setImageIndex(0);
    }, [props.currProject.name]);

    return (
        <article className="projectCard">
            <div className="project-content">
                <span className="project-count">{String(props.index + 1).padStart(2, '0')} / {String(props.count).padStart(2, '0')}</span>
                <h2>{props.currProject.name}</h2>
                <p>{props.currProject.description}</p>
                <div className="project-stack" aria-label="Project technologies">
                    {props.currProject.stack.map((item) => (
                        <span key={item}>{item}</span>
                    ))}
                </div>
                <a className="viewButton" href={props.currProject.link} target="_blank" rel="noreferrer">
                    View Project
                </a>
            </div>

            <div className="imgCont">
                <div className="main-image-frame">
                    <img key={activeImage} src={activeImage} alt={`${props.currProject.name} preview`} decoding="async" />
                </div>

                {images.length > 1 && (
                    <div className="thumbnail-row" aria-label={`${props.currProject.name} image selector`}>
                        {images.map((image, index) => (
                            <button
                                key={image}
                                className={index === imageIndex ? 'thumbnail-button active' : 'thumbnail-button'}
                                type="button"
                                onClick={() => setImageIndex(index)}
                                aria-label={`Show preview ${index + 1}`}
                            >
                                <img src={image} alt="" aria-hidden="true" decoding="async" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

export default ProjectCard;
