import React from "react";
import { Client } from "boardgame.io/react";
import CitadelsGame from "game/CitadelsGame";
import Board from "components/game/Board.react";

const GameApp = Client({
  game: CitadelsGame,
  board: Board,
  numPlayers: 5
});

export default GameApp;