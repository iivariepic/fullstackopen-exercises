import SingleCountryInformation from "./SingleCountryInformation";
import {useState, useEffect} from "react";

const ShowCountryButton = ({ onClick }) => <button onClick={onClick}>Show</button>

const CountryListEntry = ({ country, onShow }) => <li>{country.name.common} <ShowCountryButton
  onClick={() => onShow(country)}/></li>


const CountryList = ({ countries, searchQuery }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Reset the selection if the search query was changed
  useEffect(() => {
    setSelectedCountry(null);
  }, [searchQuery]);

  if (countries === null || searchQuery === null) return <p>Loading, please wait...</p>

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (selectedCountry) {
    return (
      <SingleCountryInformation country={selectedCountry}/>
    )
  }

  return (
    <>
      {filteredCountries.length > 1 && filteredCountries.length <= 10?
        filteredCountries.map(country => <CountryListEntry
          key={country.name.common}
          country={country}
          onShow={setSelectedCountry}
          />
        )
      : filteredCountries.length > 10 ? <li>Too many matches, specify another filter</li>
      : filteredCountries.length === 1 ? <SingleCountryInformation country={filteredCountries[0]}/>
      : <li>No matches</li>}
    </>
  )
}

export default CountryList