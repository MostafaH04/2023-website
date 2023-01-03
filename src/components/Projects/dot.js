function Dot(props)
{
    let styleDot = {
        backgroundColor: "rgba(223, 223, 223, 0.69)",
        borderRadius: "50%",
        width: "15px",
        height: "15px",
        margin: "7.5px"
    }
    let extraText = "";
    if (props.selected)
    {
        styleDot = {
            backgroundColor: "#FFFFFF",
            borderRadius: "32px",
            width: "50px",
            height: "15px",
            margin: "7.5px"
        }
        extraText = "selected"
    }
    
    return(
        <div className = {`dot-selection ${extraText}`} style = {styleDot}>
        </div>
    );
}

export default Dot;