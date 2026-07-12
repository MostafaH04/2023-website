function Dot(props) {
    return (
        <button
            className={props.selected ? 'dot-selection selected' : 'dot-selection'}
            type="button"
            aria-label={props.label}
            aria-current={props.selected ? 'true' : undefined}
            onClick={props.onClick}
        />
    );
}

export default Dot;
