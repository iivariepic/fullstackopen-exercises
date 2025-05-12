import {useEffect, useState} from 'react'
import NewPersonForm from "./components/NewPersonForm";
import SearchBar from "./components/SearchBar";
import Numbers from "./components/Numbers";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([...persons])

  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
        setFilteredPersons(returnedPersons)
      })
  }, []);

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