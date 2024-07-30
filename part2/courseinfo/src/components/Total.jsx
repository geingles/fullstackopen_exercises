const Total = ({parts}) => {
    const total = parts.reduce( (resp, val) => resp = resp + val.exercises, 0)
    return(
        <p>
          Number of exercises {total}
        </p>
    )
}

export default Total