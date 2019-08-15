import React, { Component } from "react";
import "./css/GameEnd.css";

// This Component shows the Summary at the end of the game
// For examples, the chosen Category, the total Questions, and the final Score
export class GameEnd extends Component {
  render() {
    return (
      <div className="GameEnd">
        <button id="GameEnd-btn" onClick={this.props.newGame}>
          New Game
        </button>
        <div className="GameEnd-text">
          <strong>Category:</strong> {this.props.category}
        </div>
        <div className="GameEnd-text">
          <strong>Total Questions:</strong> {this.props.totalQ}
        </div>
        <div className="GameEnd-text">
          <strong>Your Score:</strong> {this.props.score} / {this.props.totalQ}
        </div>
      </div>
    );
  }
}

export default GameEnd;
