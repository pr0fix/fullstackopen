import { useEffect, useState } from 'react';
import Personform from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
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
		const existingPerson = persons.find(person => person.name === newName);
		if (existingPerson) {
			if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				updatePerson(existingPerson.id);
			}
		} else {
			try {
				personService
					.createPerson({ name: newName, number: newNumber })
					.then(response => {
						setPersons(persons.concat(response));
						setNewName("");
						setNewNumber("");
					})
					.catch(err => {
						console.error(err);
					});
			} catch (err) {
				console.error(err);
			}
		};
	}
	
	const updatePerson = (id) => {
        const updatedPerson = { ...persons.find(person => person.id === id), number: newNumber };
		try {
        personService.updatePerson(id, updatedPerson)
            .then(response => {
                setPersons(persons.map(person => person.id !== id ? person : updatedPerson));
                setNewName("");
                setNewNumber("");
            })
            .catch(err => {
                console.error(err);
            });
		} catch(err) {
			console.error(err);
		}
    };

	const getPersons = () => {
		try {
			personService
				.getAllPersons()
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
			<div>
				<Persons persons={persons} search={search} setPersons={setPersons} />
			</div>
		</div>
	)

}

export default App