import React, { Component } from "react";
import "./TriviaGame.css";
import NewGameForm from "./NewGameForm";

import GamePlay from "./GamePlay";

export class TriviaGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: { totalQuestions: 5, category: "", id: false },
      player: { curQuestion: 1, curScore: 0 },
      data: "",
      ready: false,
      curQuestion: "",
      curAnswers: "",
      curQ: 0
    };
    this.create = this.create.bind(this);
  }

  create(newGame) {
    this.setState({ newGame: newGame, ready: true });
  }

  render() {
    let totalQ = this.state.newGame.totalQuestions;
    let id = this.state.newGame.id;

    let game = !this.state.ready ? (
      <NewGameForm create={this.create} />
    ) : (
      <GamePlay totalQ={totalQ} catId={id} />
    );

    return (
      <div className="TriviaGame">
        <h1>Trivia Game</h1>

        {game}
      </div>
    );
  }
}

export default TriviaGame;
