import React, { Component } from "react";
import { cyre } from "cyre";


class Counter extends Component {
  render() {
    let classes =
      this.props.counter.value < 0
        ? "badge badge-warning m-2"
        : "badge badge-primary m-2 p-20";
    return (
      <div>
        <span className={classes}>{this.props.counter.value}</span>
        <button
          onClick={() => {
            cyre.emit('decrementor', this.props.counter);
          }}
          className="btn btn-info btn-sm m-1"
        >
          -Decrement
        </button>

        <button
          onClick={() => {
            //this.props.onIncrement(this.props.counter);
            cyre.emit('incrementor', this.props.counter);
          }}
          className="btn btn-primary btn-sm m-1"
        >
          +Increment
        </button>


        <button
          onClick={() =>
            cyre.emit('onDelete', this.props.counter.id)
          }
          className="btn btn-danger btn-sm m-1"
        >
          Delete
        </button>

        <button
          onClick={() =>
            cyre.emit('upToNothing', this.props.counter.id)
          }
          className="btn btn-secondary btn-sm m-1"
        >
          Up to nothing
        </button>
      </div >
    );
  }
}

export default Counter;