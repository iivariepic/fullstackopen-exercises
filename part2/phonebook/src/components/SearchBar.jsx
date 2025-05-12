import {useState} from "react";

const SearchBar = ({ persons, setFilteredPersons }) => {
  const [searchQuery, setSearchQuery] = useState('')
  let tempSearch = searchQuery

  const checkName = (person) =>
    person.name.toLowerCase().includes(tempSearch.toLowerCase())

  const filterPersons = () => {
    if (tempSearch === "") {
      setFilteredPersons([...persons])
      return
    }
    const newFilteredPersons = persons.filter(checkName)
    setFilteredPersons(newFilteredPersons)
  }

  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
    tempSearch = event.target.value
    filterPersons()
  }

  return (
    <>
      filter shown with <input onChange={handleQueryChange}/>
    </>
  )
}

export default SearchBar