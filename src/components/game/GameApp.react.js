import React from 'react';
import {Client} from 'boardgame.io/react';
import CitadelsGame from 'game/CitadelsGame';
import {SocketIO} from 'boardgame.io/multiplayer';
import Board from 'components/game/Board.react';

const GameApp = Client({
  game: CitadelsGame,
  board: Board,
  multiplayer: SocketIO({server: 'http://localhost:8000'}),
});

export default GameApp;
