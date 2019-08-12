import React, { Component } from "react";
import "./TriviaGame.css";
import NewGameForm from "./NewGameForm";

import GamePlay from "./GamePlay";

export class TriviaGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: { totalQuestions: 5, category: "", id: "" },
      player: { curQuestion: 1, curScore: 0 },
      game: ["apiData"]
    };
    this.create = this.create.bind(this);
  }

  create(newGame) {
    this.setState({ newGame: newGame });
    console.log(newGame);
  }

  render() {
    const totalQ = this.state.newGame.totalQuestions;
    const catName = this.state.newGame.category;
    const catId = this.state.newGame.id;
    let game =
      catId === "" ? (
        <NewGameForm create={this.create} />
      ) : (
        <GamePlay totalQ={totalQ} catName={catName} catId={catId} />
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
