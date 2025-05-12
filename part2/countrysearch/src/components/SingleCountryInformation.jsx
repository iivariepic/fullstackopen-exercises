const SingleCountryInformation = ({ country }) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <li>Capital {country.capital}</li>
      <li>Area {country.area}</li>
      <div className="Languages">
        <h2>Languages</h2>
        <ul className="languageList">
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
      </div>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`}/>
    </div>
  )}

export default SingleCountryInformation