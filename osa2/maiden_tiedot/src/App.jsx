import axios from 'axios';
import { useState, useEffect } from 'react';
export default function App() {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
    const rest_url = "https://studies.cs.helsinki.fi/restcountries";
    
    useEffect(() => {
            axios.get(`${rest_url}/api/all`)
            .then(response => {
                setCountries(response.data)
                setFilteredCountries(response.data)
                console.log(response.data)
            })
            .catch(err => {
                console.err(err);
            });
    }, [selectedCountry])
    
	const handleShowButtonClick = (country) => {
		setSelectedCountry(country);
		setFilteredCountries([country])
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
                <p>capital {filteredCountries[0].capital}</p>
                <p>area {filteredCountries[0].area}</p>
				<h3>languages:</h3>
                <ul>
                    {Object.entries(filteredCountries[0].languages).map(([code, name]) => 
                        <li key={code}>{name}</li>
                    )}
                </ul>
				<img src={filteredCountries[0].flags.png} alt={filteredCountries[0].flags.alt} width={200}></img>
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
                    <p>capital {selectedCountry.capital}</p>
                    <p>area {selectedCountry.area}</p>
                    <h3>languages:</h3>
                    <ul>
                        {Object.entries(selectedCountry.languages).map(([code, name]) => 
                            <li key={code}>{name}</li>
                        )}
                    </ul>
                    <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} width={200}></img>
				</div>
				: findMatches()}
            
        </>

    )
}