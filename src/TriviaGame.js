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
      curQ: 0,
      startNewGame: false
    };
    this.create = this.create.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  create(newGame) {
    this.setState({ newGame: "", startNewGame: false });
    this.setState({ newGame: newGame, ready: true });
  }

  handleNewGame() {
    this.setState({ newGame: { totalQuestions: 5, category: "", id: false } });
    this.setState({ startNewGame: true });
  }

  render() {
    let totalQ = this.state.newGame.totalQuestions;
    let id = this.state.newGame.id;
    let catName = this.state.newGame.category;

    let game =
      !this.state.ready || this.state.startNewGame ? (
        <NewGameForm create={this.create} />
      ) : (
        <GamePlay
          totalQ={totalQ}
          catId={id}
          catName={catName}
          newGameBtn={this.handleNewGame}
        />
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
