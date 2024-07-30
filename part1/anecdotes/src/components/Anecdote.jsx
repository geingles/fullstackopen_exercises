const Anecdote = ({title, anecdote, votes}) => {
    return (
        <>
            <h1>{title}</h1>
            <p>{anecdote}</p>
            <p>Has {votes} votes</p>
        </>
    )
}

export { Anecdote }