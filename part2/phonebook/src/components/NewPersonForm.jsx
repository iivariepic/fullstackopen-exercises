import { useState } from "react"
import personService from '../services/persons'

const NewPersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(prev => [...prev, returnedPerson])
        setNewName('')
        setNewNumber('')
      })
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
