const api_key = import.meta.env.VITE_WEATHER_KEY;
import axios from 'axios';

const getWeather = (city) => {
  const encodedCity = encodeURIComponent(city)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${api_key}&units=metric`;

  return axios.get(url)
    .then(response => {
      const weather = response.data;
      return weather;
    })
    .catch(error => {
      console.error(`Error fetching weather for ${city}:`, error);
      return null
    });
};

export default { getWeather}