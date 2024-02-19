import personService from "../services/personService";

const Persons = ({ persons, search, setPersons, displayNotification }) => {

	const deletePerson = (personId) => {
		const personToDelete = persons.find(person => person.id === personId);
		if (window.confirm(`Delete ${personToDelete.name} ?`)){
			personService.deletePerson(personId)
			.then(response => {
				setPersons(persons.filter(person => person.id !== personId));
			})
			.catch(err => {
				displayNotification(`Information of ${personToDelete.name} has already been removed from server`, "error")
				console.error(err);
			});
		}
	};

	return (
		<>
			{persons &&
				persons
					.filter((person) => {
						const fullName = `${person.name} ${person.number}`.toLowerCase();
						return search.trim() === '' || fullName.includes(search.toLowerCase());
					})
					.map((person) => (

						<p key={person.name}>
							{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
						</p>

					))}
		</>
	);
	};

	export default Persons;
