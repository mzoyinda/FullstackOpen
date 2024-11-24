import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPersons = persons.filter(
    (persons) =>
      persons.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persons.number.includes(searchQuery)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      alert("Please fill all inputs");
      return;
    }

    const alreadyExist = persons.some(
      (person) => person.name === newName || person.number === newNumber
    );

    if (alreadyExist) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  );
};

export default App;
