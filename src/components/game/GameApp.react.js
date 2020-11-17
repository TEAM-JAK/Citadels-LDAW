import {Client} from 'boardgame.io/react';
import CitadelsGame from './CitadelsGame.react';
import Board from './Board.react';

const GameApp = Client({
  game: CitadelsGame,
  board: Board,
  numPlayers: 3,
  debug: false,
});

export default GameApp;
