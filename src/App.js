import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: null
    };
  }

  render() {
    const { counter, error } = this.state;

    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {counter}</h1>
        <button
          onClick={() => {this.setState({counter: counter+1, error: null })}}
          data-test="increment-button">Increment counter</button>
        <button
          onClick={() => {
            counter === 0 ? (
              this.setState({ error: "You can't go below zero."})
            ) : (
              this.setState({ counter: counter-1})
            )
          }}
          data-test="decrement-button">Decrement counter</button>
          {error ? <p data-test="error-msg" style={{color: 'red'}}>{error}</p> : null}
      </div>
    );
  }
}

export default App;
