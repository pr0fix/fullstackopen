import { useState } from 'react'

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
	  <div>filter shown with<input type='text' onChange={(e) => setSearch(e.target.value)}/></div>
	  <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
		<div>
			number: <input type='text' value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
		</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons && persons.filter((person) => {
		return search.toLowerCase() === '' ? person : `${person.name}${person.number}`.toLowerCase()
		.includes(search.toLowerCase())
	  })
	  .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App