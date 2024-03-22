import { useEffect, useState } from "react";
import Personform from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/personService";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPerson();
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className={message.status}>{message.text}</div>;
  };

  const displayNotification = (text, status) => {
    setNotificationMessage({ text, status });
    setTimeout(() => setNotificationMessage(null), 5000);
  };

  const addPerson = () => {
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(existingPerson.id);
      }
    } else {
      personService
        .createPerson({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
          displayNotification(`Added ${newName}`, "success");
        })
        .catch(error => {
          displayNotification(error.response.data.error, "error");
        });
    }
  };

  const updatePerson = (id) => {
    const updatedPerson = {
      ...persons.find((person) => person.id === id),
      number: newNumber,
    };

    personService
      .updatePerson(id, updatedPerson)
      .then((response) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : updatedPerson))
        );
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error(error);
        displayNotification(
          `Information of ${updatedPerson.name} has already been removed from server`,
          "error"
        );
      });
  };

  const getPersons = () => {
    try {
      personService.getAllPersons().then((response) => {
        setPersons(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter setSearch={setSearch} />

      <h3>Add a new</h3>
      <Personform
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <div>
        <Persons
          persons={persons}
          search={search}
          setPersons={setPersons}
          displayNotification={displayNotification}
        />
      </div>
    </div>
  );
};

export default App;
