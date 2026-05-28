function Dot(props)
{
    return(
        <button
            type = "button"
            className = {`dot-selection ${props.selected ? 'selected' : ''}`}
            aria-label = {props.label || 'Select project'}
            aria-pressed = {props.selected}
            onClick = {props.onClick}
        />
    );
}

export default Dot;
