import React, {useContext, useState, useEffect, useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import CreateGameButton from 'components/create_game/CreateGameButton.react';
import RoomsList from 'components/home/RoomsList.react';
import {useParams} from 'react-router-dom';
import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
});

export default function LobbySetup({startGame}) {
  const {id} = useParams();
  const classes = useStyles();
  const loadRoomMetadata = useStoreActions((s) => s.loadRoomMetadata);
  const roomMetadata = useStoreState((s) => s.roomMetadata);
  const firebase = useContext(FirebaseContext);
  const [userProfile, setUserProfile] = useState(null);
  const activeRoomPlayer = useStoreState((s) => s.activeRoomPlayer);
  const joinRoom = useStoreActions((s) => s.joinRoom);

  const gameRoomFull =
    roomMetadata != null
      ? roomMetadata.players.filter((p) => !p.name).length === 0
      : false;

  useEffect(() => {
    async function fetchProfile() {
      const profile = await firebase.fetchUserProfile();
      setUserProfile(profile);
    }
    fetchProfile();
  }, [setUserProfile, firebase]);

  useEffect(() => {
    if (userProfile != null && userProfile.username != null && roomMetadata != null) {
      // find first empty seat ID
      const emptySeatID = roomMetadata.players.find((p) => !p.name).id;
      const alreadyJoined =
        activeRoomPlayer == null
          ? false
          : roomMetadata.players.find((p) => {
              return (
                p.id === activeRoomPlayer.playerID && p.name === userProfile.username
              );
            }) != null;
      if (!alreadyJoined && emptySeatID !== undefined && id) {
        joinRoom({
          playerID: emptySeatID,
          playerName: userProfile.username,
          roomID: id,
        });
      }
    }
  }, [roomMetadata]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (id) loadRoomMetadata(id);
    }, 500);

    return () => clearInterval(intervalID);
  }, [loadRoomMetadata, id]);

  useEffect(() => {
    if (gameRoomFull) {
      setTimeout(() => startGame(), 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRoomFull]);

  return (
    <main className={classes.root}>
      <FlexLayout direction="vertical">
        <div>
          {roomMetadata != null ? (
            <ul>
              {roomMetadata.players.map((player) => (
                <li key={player.id}>
                  {player.name != null ? (
                    <Typography>{`Player ${player.name} joined!`}</Typography>
                  ) : (
                    <Typography>Waiting for player to join</Typography>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </div>
        <div>
          {gameRoomFull ? (
            <Typography>Starting Game...</Typography>
          ) : (
            <Typography>Game will start when all players join!</Typography>
          )}
        </div>
      </FlexLayout>
    </main>
  );
}
