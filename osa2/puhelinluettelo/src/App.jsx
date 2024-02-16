import { useEffect, useState } from 'react'
import Personform from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		addPerson();
	};

	const addPerson = () => {
		if (persons.some(person => person.name === newName)) {
			window.alert(`${newName} is already added to phonebook`);
		} else {
			setPersons([...persons, { name: newName, number: newNumber }]);
			setNewName("");
			setNewNumber("");
		};
	}

	const getPersons = () => {
		axios
			.get("http://localhost:3001/persons")
			.then(response => {
				setPersons(response.data);
			});
	};

	useEffect(() => {
		getPersons();
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter setSearch={setSearch} />

			<h3>Add a new</h3>
			<Personform setNewName={setNewName} setNewNumber={setNewNumber} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} />

			<h3>Numbers</h3>
			<Persons persons={persons} search={search} />
		</div>
	)

}

export default App