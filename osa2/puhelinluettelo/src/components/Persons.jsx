import personService from "../services/personService";

const Persons = ({ persons, search }) => {

	const deletePerson = (personId) => {
		console.log(persons)
		// if (window.confirm(`Delete ${persons}`))
		personService.deletePerson(personId)
		.then(response => {
			console.log(response.id)
		});
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
