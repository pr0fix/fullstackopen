const Persons = ({ persons, search }) => {
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
              {person.name} {person.number}
            </p>
          ))}
    </>
  );
};

export default Persons;
