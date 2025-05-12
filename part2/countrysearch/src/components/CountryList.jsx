import SingleCountryInformation from "./SingleCountryInformation";

const CountryListEntry = ({ country }) => <li>{country.name.common}</li>

const CountryList = ({ countries, searchQuery }) => {
  if (countries === null || searchQuery === null) return <p>Loading, please wait...</p>

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {filteredCountries.length > 1 && filteredCountries.length <= 10?
        filteredCountries.map(country => <CountryListEntry key={country.name.common} country={country}/> )
      : filteredCountries.length > 10 ? <li>Too many matches, specify another filter</li>
      : filteredCountries.length === 1 ? <SingleCountryInformation country={filteredCountries[0]}/>
      : <li>No matches</li>}
    </>
  )
}

export default CountryList