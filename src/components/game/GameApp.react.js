import React from "react";
import { Client } from "boardgame.io/react";
import CitadelsGame from "./Game.react";
import Board from "./Board.react";

const GameApp = Client({
  game: CitadelsGame,
  board: Board,
  numPlayers: 8
});

export default GameApp;