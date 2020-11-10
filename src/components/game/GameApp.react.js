import {Client} from 'boardgame.io/react';
import CitadelsGame from 'game/CitadelsGame';
import {SocketIO} from 'boardgame.io/multiplayer';
import Board from 'components/game/Board.react';
import {BGIO_SERVER_URL} from 'game/config/client';

const GameApp = Client({
  game: CitadelsGame,
  board: Board,
  multiplayer: SocketIO({server: BGIO_SERVER_URL}),
});

export default GameApp;
