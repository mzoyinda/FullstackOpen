import { useState } from "react";

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
      <div>
        Filter shown with:{" "}
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />{" "}
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <h2>Add a new</h2>
        <div>
          name:{" "}
          <input
            type="text"
            name="contact"
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            name="number"
            value={newNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <br />
      <h2>Numbers</h2>
      <div>
        {(searchQuery ? filteredPersons : persons).map((person) => (
          <p key={person.id}>
            {person.name}: {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
