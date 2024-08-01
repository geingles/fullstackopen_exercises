const Filter = ({text, handleChange}) => {
    return (
        <div>
            {text} <input onChange={handleChange} /> 
        </div>
    )
}

export default Filter