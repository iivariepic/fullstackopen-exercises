import { useEffect, useState } from 'react'
import NewPersonForm from "./components/NewPersonForm"
import SearchBar from "./components/SearchBar"
import Numbers from "./components/Numbers"
import Notification from "./components/Notification";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState({message: null, isError: false})

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
      <Notification message={notification.message} isError={notification.isError} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NewPersonForm persons={persons} setPersons={setPersons} setNotification={setNotification}/>
      <Numbers
        persons={persons}
        setPersons={setPersons}
        searchQuery={searchQuery}
        setNotification={setNotification}
      />
    </div>
  )
}

export default App
