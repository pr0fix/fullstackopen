const Persons = ({persons, search}) => {
    return(
    <>
      {persons && persons.filter((person) => {
		return search.toLowerCase() === '' ? person : `${person.name}${person.number}`.toLowerCase()
		.includes(search.toLowerCase())
	  })
	  .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
    );
}

export default Persons