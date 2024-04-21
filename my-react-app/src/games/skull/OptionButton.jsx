function OptionButton(props)
{
    function handleClick(){
alert("hhhhhh")
    }
return(

    <button className="OptionButton" onClick={props.onClick}>{props.OptionName}</button>
    
)
}
export default OptionButton