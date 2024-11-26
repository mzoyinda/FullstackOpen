import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  const handleChange = (e) => {
    setSearch(e.target.value);
     // Reset the selected country and weather when changing the search query
    setSelectedCountry(null);
    setWeather(null);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const filteredCountries = countries?.filter((country) => {
    const searchQuery = search.toLowerCase();
    return (
      country.name.common.toLowerCase().includes(searchQuery) ||
      country.name.official.toLowerCase().includes(searchQuery)
    );
  });

  const fetchWeather = (capital) => {
    if (!capital) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    // Reset previous weather data
    setWeather(null); 
    // Fetch weather for the country's capital
    fetchWeather(country.capital?.[0]);
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <p>
        Find Countries &nbsp;
        <input type="text" value={search} onChange={handleChange} />
      </p>

      <div>
        {search && filteredCountries.length > 10 && (
          <p>Too many matches, specify another query</p>
        )}

        {search &&
          filteredCountries.length <= 10 &&
          filteredCountries.length > 1 &&
          !selectedCountry && (
            <ul>
              {filteredCountries.map((country) => (
                <li key={country.name.common}>
                  {country.name.common}{" "}
                  <button onClick={() => handleShowCountry(country)}>Show</button>
                </li>
              ))}
            </ul>
          )}

        {selectedCountry && (
          <div>
            <h2>{selectedCountry.name.common}</h2>
            <p>
              <strong>Capital:</strong> {selectedCountry.capital?.[0]}
            </p>
            <p>
              <strong>Area:</strong> {selectedCountry.area} km²
            </p>
            <p>
              <strong>Languages:</strong>
            </p>
            <ul>
              {Object.values(selectedCountry.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img
              src={selectedCountry.flags.svg}
              alt={`${selectedCountry.name.common} flag`}
              style={{ width: "200px", height: "auto" }}
            />

            {weather ? (
              <div>
                <h2>Weather in {selectedCountry.capital?.[0]}</h2>
                <p>
                  <strong>Temperature:</strong> {weather.main.temp} °C
                </p>
                <p>
                  <strong>Weather:</strong> {weather.weather[0].description}
                </p>
                <p>
                  <strong>Wind:</strong> {weather.wind.speed} m/s
                </p>
              </div>
            ) : (
              <p>Loading weather...</p>
            )}
          </div>
        )}

        {search && filteredCountries.length === 0 && <p>No matches found.</p>}
      </div>
    </div>
  );
};

export default App;
