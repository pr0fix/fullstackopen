import axios from 'axios';
import { useState, useEffect } from 'react';
export default function App() {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
    const [weather, setWeather] = useState(null);
    const rest_url = "https://studies.cs.helsinki.fi/restcountries";
    const weather_url ="https://api.openweathermap.org/data/2.5"


    const getWeatherData = async (capital) => {
            try {
                const res = await axios.get(`${weather_url}/weather?q=${capital}&APPID=${import.meta.env.VITE_API_KEY}&units=metric`)
                setWeather(res.data)
                console.log(res.data)
            } catch (err) {
                console.error("Error fetching weather data: ", err);
                setWeather(null)
            }
    }
    
    
    const getCountries = async () => {
        try {
        const res = await axios.get(`${rest_url}/api/all`)
        setCountries(res.data)
        setFilteredCountries(res.data)
        } catch (err) {
            console.error(err);
        }   
    }

    useEffect(() => {
            getCountries()
    }, [])

    useEffect(() => {
        if (filteredCountries.length > 0) {
            getWeatherData(filteredCountries[0].capital);
        }
    }, [filteredCountries])
    
	const handleShowButtonClick = (country) => {
		setSelectedCountry(country);
		setFilteredCountries([country])
        getWeatherData(country.capital)
}

    const findMatches = () => {
        if (!search) {
            return null;
        }
        const filter = filteredCountries.map(country => 
		<p key={country.name.common}>{country.name.common} <button onClick={() => handleShowButtonClick(country)}>show</button></p>)

        if (filter.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (filter.length <= 10 && filter.length > 1) {
            return filter;
        } else if (filter.length == 1) {
            return (
            <>
                <h1>{filteredCountries[0].name.common}</h1>
                <p>capital {filteredCountries[0].capital}<br/>
                area {filteredCountries[0].area}
                </p>
				<h3>languages:</h3>
                <ul>
                    {Object.entries(filteredCountries[0].languages).map(([code, name]) => 
                        <li key={code}>{name}</li>
                    )}
                </ul>
				<img src={filteredCountries[0].flags.png} alt={filteredCountries[0].flags.alt} width={200}></img>
                {weather && (
                <div>
                    <h2>Weather in {filteredCountries[0] ? filteredCountries[0].capital : ''}</h2>
                    <p>temperature: {weather.main.temp} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather && (weather.weather[0].icon)}@2x.png`} alt="weather icon"></img>
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            )}
            </>
            
            
            )    
        }
    }

    const handleInputChange = (e) => {
		setSelectedCountry(null)
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);
        const filteredSearch = countries.filter((country) => {
			const commonName = country.name.common.toLowerCase();
			const altNames = country.altSpellings.map(spelling => spelling.toLowerCase());
			return commonName.includes(searchTerm) || altNames.some(spelling => spelling.includes(searchTerm));
		});
        setFilteredCountries(filteredSearch)
    }

    return(
        <>
            <p>find countries<input type="text" value={search} onChange={handleInputChange}></input></p>
			{selectedCountry ? 
				<div>
					<h1>{selectedCountry.name.common}</h1>
                    <p>capital {selectedCountry.capital} <br/>
                    area {selectedCountry.area}</p>
                    <h3>languages:</h3>
                    <ul>
                        {Object.entries(selectedCountry.languages).map(([code, name]) => 
                            <li key={code}>{name}</li>
                        )}
                    </ul>
                    <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} width={200}></img>
				</div>
				: findMatches()}
            {selectedCountry && weather && (
                <div>
                    <h2>Weather in {selectedCountry ? selectedCountry.capital : ''}</h2>
                    <p>temperature {weather.main.temp} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather && (weather.weather[0].icon)}@2x.png`} alt="weather icon"></img>
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            )}
        </>

    )
}
