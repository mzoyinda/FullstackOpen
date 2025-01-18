import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import {
  deleteContact,
  getAllContacts,
  saveContact,
  updateContact,
} from "./services/phonebook";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getAllContacts()
      .then((resp) => {
        setPersons(resp);
      })
      .catch((error) => {
        console.error(error);
      });
    setErrorMessage("");
    setSuccessMessage("");
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

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Check if the person already exists
    const existingPerson = persons.find((person) => person.name === newName);
    console.log(existingPerson);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Do you want to update the contact?`
      );

      const existingPersonId = existingPerson.id; // Use ID as is, do not convert it to a number.

      if (confirmUpdate) {
        // Update user
        updateContact(existingPersonId, newPerson)
          .then((updatedPerson) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === existingPersonId ? updatedPerson : person
              )
            );
            setSuccessMessage(`Updated ${newName} successfully!`);
          })
          .catch((error) => {
            setErrorMessage(
              error.response?.data?.error || "Failed to update contact."
            );
          });
      }
    } else {
      // Save the new contact
      saveContact(newPerson)
        .then(() => {
          setPersons((prevPersons) => [...prevPersons, newPerson]);
          setSuccessMessage(`Added ${newName} successfully!`);
        })
        .catch((error) => {
          setErrorMessage(
            error.response?.data?.error || "Failed to save contact."
          );
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setErrorMessage("");
    setSuccessMessage("");

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
    console.log(id);
    if (window.confirm(`Delete ${name}?`)) {
      deleteContact(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
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
