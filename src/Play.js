import React, { Component } from "react";
import "./Play";

export class Play extends Component {
  render() {
    let arrAnswers;
    if (this.props.curA) {
      let answers = this.props.curA;
      answers = answers.toString();
      arrAnswers = answers.split(",");
    }

    return (
      <div className="Play">
        <p>{this.props.curQ}</p>
        <ul>
          {arrAnswers.map(a => (
            <li>{a}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Play;
