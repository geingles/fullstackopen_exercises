import Person from "./Person"

const Persons = ({persons, filter, noResults, handlePersonDelete}) => {
    return (
        <div>
        {
            (!noResults)
                ?  (filter.length !== 0)
                    ?  filter.map( person => <Person key={person.id} person={person} handlePersonDelete={handlePersonDelete} /> )
                    :  persons.map( person => <Person key={person.id} person={person} handlePersonDelete={handlePersonDelete} /> )
                : <p>{noResults}</p>
        }
        </div>
    )
}

export default Persons