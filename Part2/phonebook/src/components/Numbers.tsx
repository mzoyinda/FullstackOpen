import React from "react";

const Numbers = (props) => {
const {searchQuery, filteredPersons, persons, handleDelete} = props

  return (
    <div>
        <h2>Numbers</h2>
      <div>
        {(searchQuery ? filteredPersons : persons)?.map((person) => (
          <p key={person.id}>
            {person.name}: {person.number} <button onClick={()=>handleDelete(person.id, person.name)}>Delete</button>
          </p>
        ))}
      </div>
    </div>
  )
}

export default Numbers