import {useEffect, useState} from 'react'
import NewPersonForm from "./components/NewPersonForm";
import SearchBar from "./components/SearchBar";
import Numbers from "./components/Numbers";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([...persons])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
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