import React, { Component } from "react";

export class GameEnd extends Component {
  render() {
    return (
      <div>
        <div>Category: {this.props.category}</div>
        <div>Total Questions: {this.props.totalQ}</div>
        <div>
          Your Score: {this.props.score}/{this.props.totalQ}
        </div>
      </div>
    );
  }
}

export default GameEnd;
