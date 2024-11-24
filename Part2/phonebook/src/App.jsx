import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(newName){
      setPersons([...persons, {name: newName}])
    }else{
      alert('Please enter a number')
    }
  }

  const handleChange = (e) =>{
    const value = e.currentTarget.value
    setNewName(value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type='text' value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     <div>
      {persons.map((person, index)=>(
        <p key={index}>{person.name}</p>
        
      ))}
     </div>
    </div>
  )
}

export default App