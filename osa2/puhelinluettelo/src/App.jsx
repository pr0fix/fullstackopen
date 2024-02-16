import { useEffect, useState } from 'react'
import Personform from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios'
import personService from './services/personService';

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
			try {
				personService
					.create({ name: newName, number: newNumber })
					.then(response => {
						setPersons(persons.concat(response));
					})
					.catch(err => {
						console.error(err);
					});
				setNewName("");
				setNewNumber("");
			} catch (err) {
				console.error(err);
			}
		};
	}

	const getPersons = () => {
		try {
			personService
				.getAll()
				.then(response => {
					setPersons(response);
				});
		} catch (err) {
			console.error(err);
		}
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