import React from "react";

const Filter = (props) => {
  const { searchQuery, handleSearchChange } = props;
  return (
    <div>
      Filter shown with:{" "}
      <input
        type="text"
        name="search"
        value={searchQuery}
        onChange={handleSearchChange}
      />{" "}
    </div>
  );
};

export default Filter;
