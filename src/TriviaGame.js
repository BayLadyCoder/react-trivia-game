import React, { Component } from "react";
import "./TriviaGame.css";
import NewGameForm from "./NewGameForm";

export class TriviaGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: [{ totalQuestions: 5, category: "" }],
      player: [{ curQuestion: 1, curScore: 0 }],
      game: ["apiData"]
    };
    this.create = this.create.bind(this);
  }

  create(newGame) {
    this.setState({ newGame: [newGame] });
    console.log(newGame);
  }

  render() {
    return (
      <div className="TriviaGame">
        <h1>Trivia Game</h1>
        <NewGameForm create={this.create} />
      </div>
    );
  }
}

export default TriviaGame;
