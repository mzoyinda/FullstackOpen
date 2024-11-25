import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import { deleteContact, getAllContacts, saveContact, updateContact } from "./services/phonebook";
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    getAllContacts().then((resp) => {
      setPersons(resp);
    }).catch((error) => {
      console.error(error);
    });
    setErrorMessage('')
    setSuccessMessage('')
  }, []);

  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.number.includes(searchQuery)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!newName.trim() || !newNumber.trim()) {
      return alert("Please fill all inputs");
    }
  
    const existingPerson = persons.find(
      (person) => person.name === newName || person.number === newNumber
    );
  
    const newPerson = {
      ...existingPerson,
      name: newName,
      number: newNumber,
      id: existingPerson ? existingPerson.id : String(Date.now()),
    };
  
    const saveAction = existingPerson
      ? window.confirm(
          `${newName} is already in the phonebook. Replace the old number with a new one?`
        )
        ? updateContact(existingPerson.id, newPerson)
        : Promise.resolve()
      : saveContact(newPerson);
  
    saveAction
      .then(() => {
        setPersons((prevPersons) =>
          existingPerson
            ? prevPersons.map((person) =>
                person.id === existingPerson.id ? newPerson : person
              )
            : [...prevPersons, newPerson]
        );
        existingPerson
          ? setSuccessMessage(`${newName} updated successfully!`)
          : setSuccessMessage(`Added ${newName} successfully!`);
      })
      .catch((error) => {
        console.error("Error:", error);
  
        const status = error?.response?.status || error?.status;
  
        if (status === 404) {
          setErrorMessage(
            `${existingPerson.name} was already removed from the server.`
          );
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== existingPerson.id)
          );
        } else {
          setErrorMessage(
            `Failed to ${existingPerson ? "update" : "add"} the contact. Please try again.`
          );
        }
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setErrorMessage('')
    setSuccessMessage('')

    if (name === "contact") {
      setNewName(value);
    } else {
      setNewNumber(value);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.currentTarget.value;
    setSearchQuery(value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteContact(id)
        .then(() => {
          setPersons((prevPersons) => prevPersons.filter((person) => person.id !== id));
          setErrorMessage(`${name} deleted successfully!`);
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          alert("Failed to delete the contact. Please try again.");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <Filter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        newName={newName}
        newNumber={newNumber}
      />

      <Form handleChange={handleChange} handleSubmit={handleSubmit} />

      <Numbers
        searchQuery={searchQuery}
        filteredPersons={filteredPersons}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
