import React, { Component } from "react";
import { cyre } from "cyre";
import Counter from "./CounterInterface";

export default class Counters extends Component {
  state = {
    counters: [
      { id: "a1", value: 20 },
      { id: "a2", value: -2 },
      { id: "a3", value: 0 },
      { id: "a4", value: 5 }
    ]
  };

  componentDidMount() {

    cyre.on("incrementor", this.incrementor);
    cyre.on("decrementor", this.decrementor);
    cyre.on("handleDelete", this.handleDelete);
    cyre.on("updateState", this.updateState);
    cyre.on("doNothing", (id) => {
      console.log('Doing nothing ', id);
    });

    cyre.action({ id: "setState", type: "updateState", payload: 0 });
    cyre.action({ id: "decrementor", type: "decrementor", payload: 0 });
    cyre.action({ id: "incrementor", type: "incrementor", payload: 0 });
    cyre.action({ id: "onDelete", type: "handleDelete", payload: 0 });
    cyre.action({ id: "upToNothing", type: "doNothing", payload: 0 });

  }

  handleDelete = id => {
    const counters = this.state.counters.filter(c => c.id !== id);
    cyre.emit("setState", counters);
  };


  incrementor = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    cyre.emit("setState", counters);
  };

  decrementor = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    cyre.emit("setState", counters);
  };

  updateState = counters => {
    this.setState({ counters });
  };

  render() {
    return (
      <div className='CounterApp bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden'>
        <h1>Cyre + React</h1>
        {this.state.counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={this.handleDelete}
            onIncrement={this.incrementor}
            onDecrement={this.decrementor}
          />
        ))}
      </div>
    );
  }
}