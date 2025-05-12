import { useEffect, useState } from 'react'
import SearchBar from "./components/SearchBar";
import countryService from "./services/countries.jsx";
import CountryList from "./components/CountryList.jsx";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null)
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries)
        setSearchQuery("")
      })
  }, []);

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <CountryList countries={countries} searchQuery={searchQuery}/>
    </div>
  )
}

export default App
