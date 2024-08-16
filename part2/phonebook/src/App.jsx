import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState([])
  const [noResults, setNewNoResults] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then( initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const checkForDuplicated = (contactList, newContact) => contactList.find(contact => contact.name === newContact)
  
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
    } else {
      setFilter([])
    }
    
    (filteredList.length !== 0)
      ? setFilter(filteredList)
      : (event.target.value !== '') ? setNewNoResults('No numbers found.') : null
  }

  const addContact = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const duplicate = checkForDuplicated(persons, newName)
    if(!duplicate) {

      if(newName !== '' && newNumber !== '') {
        personService
          .create(newPerson)
          .then( response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
            event.target[0].value = ''
            event.target[1].value = ''
            setNotificationMessage({
              message: `Added ${newName}`,
              statusCode: response.status
            })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage({
              message: error.response.data.error,
              statusCode: error.response.status
            })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })

      } else {
        alert('Name and number are required fields.')
      }
  
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(duplicate.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => (person.id !== response.data.id) ? person : response.data))
            setNewName('')
            setNewNumber('')
            event.target[0].value = ''
            event.target[1].value = ''
            setNotificationMessage({
              message: `${newName} phone number has been modified`,
              statusCode: response.status
            })
          })
          .catch(error => {
            setNotificationMessage(
              {
                message: error.response.data.error,
                statusCode: error.response.status
              }
            )
          })
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      } 
    }
  }

  const handlePersonDelete = id => {
    personService
      .remove(id)
      .then( response =>{
        setPersons(persons.filter(person => person.id !== id))
        setFilter(filter.filter(person => person.id !== id))
      })
      .catch( error => {
        setNotificationMessage(
          {
            message: `Information of ${newName} has already been removed from server`,
            statusCode: error.response.status
          }
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage} />
      <Filter 
        text='filter shown with'
        handleChange={handleFilter}
      />
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        filter={filter} 
        noResults={noResults}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  )
}

export default App