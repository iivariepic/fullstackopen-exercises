import { useEffect, useState } from 'react'
import NewPersonForm from "./components/NewPersonForm"
import SearchBar from "./components/SearchBar"
import Numbers from "./components/Numbers"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NewPersonForm persons={persons} setPersons={setPersons} />
      <Numbers persons={persons} setPersons={setPersons} searchQuery={searchQuery} />
    </div>
  )
}

export default App
