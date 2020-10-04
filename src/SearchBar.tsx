import React from "react";

function SearchBar() {

  return (
    <div>
      <input
        type="text"
        className="form-control"
        id="searchbar"
        aria-describedby="searchBar"
        placeholder="Search..."
      ></input>
    </div>
  );
}

export default SearchBar;
