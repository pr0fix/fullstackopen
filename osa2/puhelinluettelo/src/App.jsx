import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const handleSubmit = (e) => {
  e.preventDefault();
  addPerson();
};

const addPerson = () => {
if(persons.some(person => person.name === newName)) {
	window.alert(`${newName} is already added to phonebook`)
} else {
	setPersons([...persons, {name: newName}]);
	setNewName("");
};
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons && persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )

}

export default App