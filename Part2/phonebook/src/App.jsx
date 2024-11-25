import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
  axios.get('http://localhost:3001/persons').then((response)=> {
    setPersons(response.data)
  })
  }, [])
  


  const filteredPersons = persons?.filter(
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

    const alreadyExist = persons?.some(
      (person) => person.name === newName || person.number === newNumber
    );

    if (alreadyExist) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber , id: persons.length + 1 }]);
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
