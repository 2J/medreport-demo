import React, { Component } from "react";

interface SearchBarProps {
  searchUpdated: any;
}

interface SearchBarState {}

export default class SearchBar extends Component<
  SearchBarProps,
  SearchBarState
> {
  inputChanged(searchText: string) {
    this.props.searchUpdated(searchText);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="form-control"
          id="searchbar"
          aria-describedby="searchBar"
          placeholder="Search..."
          onChange={(e) => this.inputChanged(e.target.value)}
        ></input>
      </div>
    );
  }
}
