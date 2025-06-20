import { useState } from "react"
import personService from '../services/persons'

const NewPersonForm = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      const existingPerson = persons.find(person => person.name === newName)
      const newPerson = {...existingPerson, number: newNumber}
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id,
            newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `Changed the number of ${newName}`,
              isError: false
            });
          })
          .catch(error => {
            setNotification({ message: error.response.data.error, isError: true })
          })

        setTimeout(() => {
          setNotification({ message: null, isError: false });
        }, 5000);
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
        setNotification({
          message: `Added ${newName}`,
          isError: false
        })
      })
      .catch(error => {
        setNotification({ message: error.response.data.error, isError: true })
      })
    setTimeout(() => {
      setNotification({ message: null, isError: false });
    }, 5000);
  }

  return (
    <form onSubmit={addPerson}>
      <h2>Add a new Entry</h2>
      <div>
        name: <input value={newName} onChange={e => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
      </div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default NewPersonForm
