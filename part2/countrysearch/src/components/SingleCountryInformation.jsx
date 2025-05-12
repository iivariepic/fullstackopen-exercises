import weatherService from "../services/weather"
import { useEffect, useState } from "react"

const SingleCountryInformation = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(country.capital)
      .then(returnWeather => setWeather(returnWeather))
  }, [])

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
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} height="200"/>
      <div className="Weather">
        <h2>Weather in {country.capital}</h2>
        {weather !== null
          ? <li>Temperature {weather.main.temp} Celsius</li>
          : <li>Temperature loading</li>}
        {weather !== null
        ? <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].main}
          />
        : <li>Loading weather</li>}
        {weather !== null
          ? <li>Wind {weather.wind.speed} m/s</li>
          : <li>Wind loading</li>}
      </div>
    </div>
  )}

export default SingleCountryInformation