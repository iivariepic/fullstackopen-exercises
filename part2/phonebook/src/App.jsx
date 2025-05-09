import { useState } from 'react'
import NewPersonForm from "./components/NewPersonForm";
import SearchBar from "./components/SearchBar";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState([...persons])

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchBar persons={persons} setFilteredPersons={setFilteredPersons}/>
      <NewPersonForm persons={persons} setPersons={setPersons} setFilteredPersons={setFilteredPersons}/>
      <Numbers persons={filteredPersons}/>
    </div>
  )
}

export default App