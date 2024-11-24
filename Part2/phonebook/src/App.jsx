import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "0909786474"}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      alert("Please fill all inputs");
      return;
    }
 
    const alreadyExist = persons.some((person) => person.name === newName || person.number === newNumber);

    if (alreadyExist) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (e) => {
    const {name, value} = e.currentTarget;
    if (name === "contact") {
      setNewName(value);
    } else {
      setNewNumber(value);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
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
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => (
          <p key={index}>{person.name}: {person.number}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
