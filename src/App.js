import React, { Component } from "react";
import Funds from "./components/funds";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Funds />
      </main>
    );
  }
}

export default App;
