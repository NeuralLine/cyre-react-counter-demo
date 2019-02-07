import React, { Component } from "react";
import cyre from "cyre";
import Counter from "./CounterInterface";
import AddCounter from "./AddCounter";

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
    cyre.on("addCounter", this.addCounter);
    cyre.on("handleDelete", this.deleteCounter);
    cyre.on("updateState", this.updateState);
    cyre.on("addOne", this.addOne);
    cyre.on("minusOne", this.minusOne);

    cyre.action({ id: "setState", type: "updateState", payload: 0 });
    cyre.action({ id: "decrementor", type: "minusOne", payload: 0 });
    cyre.action({ id: "incrementor", type: "addOne", payload: 0 });
    cyre.action({ id: "onDelete", type: "handleDelete", payload: 0 });
    cyre.action({ id: "upToNothing", type: "unknown", payload: 0, log: true });
    cyre.action({ id: "addCounter", type: "addCounter", payload: 0 });
  }

  addCounter = id => {
    const counters = [
      ...this.state.counters,
      { id: performance.now(), value: 0 }
    ];
    cyre.call("setState", counters);
  };

  addOne = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    cyre.call("setState", counters);
  };

  minusOne = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    cyre.call("setState", counters);
  };

  deleteCounter = id => {
    const counters = [...this.state.counters];
    cyre.call("setState", counters.filter(c => c.id !== id));
  };

  updateState = counters => {
    this.setState({ counters });
  };

  render() {
    return (
      <div className="counter-app bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
        <h1>Cyre + React</h1>
        <div className="counter-section">
          <AddCounter />
          {this.state.counters.map(counter => (
            <Counter key={counter.id} counter={counter} />
          ))}
        </div>
      </div>
    );
  }
}
