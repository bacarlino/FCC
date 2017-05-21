import React from 'react';
import '../styles/tictactoe.css';

class Box extends React.Components {

  render() {
    return (
      <div id={this.props.id}></div>
    );
  }
}

export default class TicTacToe extends React.Components {

  render() {
    return (
      <div id="game-board">
        <h2>FCC TIC-TAC-TOE</h2>
        <div class="board-row">
          <div id="one" class="board-box"></div>
          <div id="two" class="board-box"></div>
          <div id="three" class="board-box"></div>
        </div>
        <div class="board-row">
          <div id="four" class="board-box"></div>
          <div id="five" class="board-box"></div>
          <div id="six" class="board-box"></div>
        </div>
        <div class="board-row">
          <div id="seven" class="board-box"></div>
          <div id="eight" class="board-box"></div>
          <div id="nine" class="board-box"></div>
        </div>
        <div id="prompt"></div>
      </div>
    );
  }
}
