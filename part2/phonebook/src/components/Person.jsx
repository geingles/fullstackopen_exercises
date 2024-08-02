const Person = ({ person, handlePersonDelete }) => {
    return (
        <p>
            {person.name} {person.number}
            <button onClick={() => handlePersonDelete(person.id)}>delete</button>
        </p>
    )
}

export default Person