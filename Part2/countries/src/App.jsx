import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    setSearch(value);
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

  const displayedCountries = search ? filteredCountries : countries;

  return (
    <div>
      <h1>Country Finder</h1>
      <p>
        Find Countries &nbsp;
        <input type="text" value={search} onChange={handleChange} />
      </p>

      <div>
        {search && displayedCountries?.length > 10 && (
          <p>Too many matches, specify another</p>
        )}
        {search &&
          displayedCountries?.length <= 10 &&
          displayedCountries.length > 1 && (
            <ul>
              {displayedCountries.map((country) => (
                <li key={country.name.common}>{country.name.common}</li>
              ))}
            </ul>
          )}
        {search && displayedCountries.length === 1 && (
          <div>
            <h2>{displayedCountries[0].name.common}</h2>
            <p>
              <strong>Capital:</strong> {displayedCountries[0].capital?.[0]}
            </p>
            <p>
              <strong>Area:</strong> {displayedCountries[0].area} km²
            </p>
              <strong>Languages:</strong>
              <ul>
              {Object.values(displayedCountries[0].languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img
              src={displayedCountries[0].flags.svg}
              alt={`${displayedCountries[0].name.common} flag`}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
        {search && displayedCountries?.length === 0 && <p>No matches found.</p>}
      </div>
    </div>
  );
};

export default App;
