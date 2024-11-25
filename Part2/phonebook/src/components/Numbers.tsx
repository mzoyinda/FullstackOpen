import React from "react";

const Numbers = (props) => {
const {searchQuery, filteredPersons, persons} = props

  return (
    <div>
        <h2>Numbers</h2>
      <div>
        {(searchQuery ? filteredPersons : persons)?.map((person) => (
          <p key={person.id}>
            {person.name}: {person.number}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Numbers