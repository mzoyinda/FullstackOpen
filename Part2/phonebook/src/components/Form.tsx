import React from "react";

const Form = (props) => {
    const {handleSubmit, newName, newNumber, handleChange } = props
  return (
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
  )
}

export default Form