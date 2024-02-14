import { useState } from 'react'
import Personform from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  addPerson();
};

const addPerson = () => {
if(persons.some(person => person.name === newName)) {
	window.alert(`${newName} is already added to phonebook`)
} else {
	setPersons([...persons, {name: newName, number: newNumber}]);
	setNewName("");
	setNewNumber("");
};
}

  return (
    <div>
		<h2>Phonebook</h2>
	
		<Filter setSearch={setSearch}/>
	
		<h3>Add a new</h3>
		<Personform setNewName={setNewName} setNewNumber={setNewNumber} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}/>
    
		<h3>Numbers</h3>
		<Persons persons={persons} search={search}/>
    </div>
  )

}

export default App