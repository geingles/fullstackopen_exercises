import Person from "./Person"

const Persons = ({persons, filter, noResults}) => {
    return (
        <div>
        {
            (!noResults)
                ?  (filter.length !== 0)
                    ?  filter.map( person => <Person key={person.id} person={person} /> )
                    :  persons.map( person => <Person key={person.id} person={person} /> )
                : <p>{noResults}</p>
        }
        </div>
    )
}

export default Persons