import React, { Component } from "react";
import "./TriviaGame.css";
import NewGameForm from "./NewGameForm";
import axios from "axios";

export class TriviaGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: [{ totalQuestions: 5, category: "", id: "" }],
      player: [{ curQuestion: 1, curScore: 0 }],
      game: ["apiData"]
    };
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    const totalQ = this.state.newGame.totalQuestions;
    const catId = this.state.newGame.id;
    const base_url = "https://opentdb.com/api.php?";
    const url = base_url + `amount=${totalQ}&category=${catId}&encode=url3986`;
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
