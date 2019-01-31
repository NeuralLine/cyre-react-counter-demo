import React, { Component } from 'react';
import './App.css';
import Counters from "./components/Counters";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counters />
      </div>
    );
  }
}

export default App;
