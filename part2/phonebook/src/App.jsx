import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState([])
  const [noResults, setNewNoResults] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        setPersons(response.data)
      })
  }, [])

  const checkForDuplicated = (contactList, newContact) => {
    const duplicate = contactList.find(contact => contact.name === newContact)
    return ( 
      (duplicate)
      ? true
      : false
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    let filteredList = []
    setNewNoResults('')
    
    if(event.target.value !== '') {
      filteredList = persons.filter( person => person.name.toLowerCase().match(event.target.value.toLowerCase()) )
    }
    
    (filteredList.length !== 0)
      ? setNewFilter(filteredList)
      : setNewNoResults('No numbers found.')
  }

  const addContact = (event) => {
    event.preventDefault()
    if(!checkForDuplicated(persons, newName)) {
      (newName !== '' && newNumber !== '') 
        ? ( setPersons(persons.concat({ name: newName, number: newNumber, id: Math.max(...persons.map(o => o.id)) + 1 })), 
            setNewName(''), 
            setNewNumber(''), 
            event.target[0].value = '', 
            event.target[1].value = '' )
        : alert('Name and number are required fields.')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        text='filter shown with'
        handleChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        filter={filter} 
        noResults={noResults} />
    </div>
  )
}

export default App