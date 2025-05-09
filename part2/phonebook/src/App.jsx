import { useState } from 'react'

const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => <Person key={person.name} person={person}/>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'}
  ])
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

    setPersons([
      ...persons,
      {name: newName,
      number: newNumber}
    ])
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
      <Numbers persons={persons}/>
    </div>
  )
}

export default App