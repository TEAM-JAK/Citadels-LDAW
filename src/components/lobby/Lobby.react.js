import React, {useContext, useState, useEffect, useCallback} from 'react';
import {useStoreState} from 'easy-peasy';
import {useParams} from 'react-router-dom';
import LobbySetup from 'components/lobby/LobbySetup.react';
import GameApp from 'components/game/GameApp.react';

function LobbyPlay() {
  const {id} = useParams();
  const activeRoomPlayer = useStoreState((s) => s.activeRoomPlayer);

  return (
    <GameApp
      matchID={id}
      playerID={String(activeRoomPlayer.playerID)}
      credentials={activeRoomPlayer.credential}
    />
  );
}

export default function Lobby() {
  const [isGameRunning, setGameRunning] = useState(false);

  return isGameRunning ? (
    <LobbyPlay />
  ) : (
    <LobbySetup startGame={() => setGameRunning(true)} />
  );
}
