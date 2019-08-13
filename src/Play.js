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

    let curQuestNum = this.props.curQNum + 1;
    return (
      <div className="Play">
        <p>
          Question {curQuestNum}/{this.props.totalQ}
        </p>
        <p>Score: {this.props.score}</p>
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
