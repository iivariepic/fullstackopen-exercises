import {useState} from "react";
import personService from '../services/persons'


const NewPersonForm = ({persons, setPersons, setFilteredPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    // Prevent submission if name exists
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {name: newName, number: newNumber}
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons([
          ...persons,
          returnedPerson
        ])
        setFilteredPersons([
          ...persons,
          returnedPerson
        ])
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addPerson}>
      <h2>Add a new Entry</h2>
      <div>
        name: <input
        onChange={handleNameChange}
        placeholder="Enter New Name"
      />
      </div>
      <div>
        number: <input
        onChange={handleNumberChange}
        placeholder="Enter New Number"
      />
      </div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default NewPersonForm