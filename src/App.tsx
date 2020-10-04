import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Report from "./Report";
import Reports from "./Reports";
import SearchBar from "./SearchBar";

interface AppProps {}

interface AppState {
  searchText: string;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { searchText: "" };
  }

  searchUpdated(searchText: string) {
    this.setState({ searchText: searchText });
  }

  render() {
    let searchText = this.state.searchText;

    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-sm-2 margin-top-20">
              <Link to="/" className="btn btn-dark" id="homeButton">
                Home
              </Link>
            </div>
            <div className="col-sm-10 margin-top-20">
              <SearchBar searchUpdated={this.searchUpdated.bind(this)} />
            </div>
          </div>

          <hr />

          <Switch>
            <Route exact path="/">
              <Reports searchText={searchText} />
            </Route>
            <Route path="/report/:id" component={Report} />
          </Switch>
        </div>
      </Router>
    );
  }
}
