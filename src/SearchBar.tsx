import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

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
