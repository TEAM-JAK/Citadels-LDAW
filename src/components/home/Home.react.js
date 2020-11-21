import React, {useContext, useState, useEffect, useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import CreateGameButton from 'components/create_game/CreateGameButton.react';
import RoomsList from 'components/home/RoomsList.react';

const useStyles = makeStyles({
  root: {
    paddingBottom: 24,
    display: 'flex',
    paddingTop: 16,
    flexDirection: 'column',
    paddingRight: 24,
    paddingLeft: 24,
  },
  creation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
});

export default function Home() {
  const classes = useStyles();
  const rooms = useStoreState((s) => s.rooms);
  const createGameRoom = useStoreActions((s) => s.createGameRoom);
  const setRooms = useStoreActions((s) => s.setRooms);
  const loadRooms = useStoreActions((s) => s.loadRooms);
  const setRoomID = useStoreActions((s) => s.setRoomID);
  const roomID = useStoreState((s) => s.roomID);
  const firebase = useContext(FirebaseContext);
  const [userProfile, setUserProfile] = useState(null);

  const onJoin = useCallback(
    (matchID) => {
      setRoomID(matchID);
    },
    [setRoomID],
  );

  useEffect(() => {
    async function fetchProfile() {
      const profile = await firebase.fetchUserProfile();
      setUserProfile(profile);
    }
    fetchProfile();
  }, [setUserProfile, firebase]);

  useEffect(() => {
    // const intervalID = setInterval(() => {
    //   loadRooms();
    // }, 500);

    // return () => clearInterval(intervalID);
    firebase.firestore.collection('bgio_metadata').onSnapshot((snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({...doc.data(), matchID: doc.id});
      });
      setRooms(result);
    });
  }, [firebase, setRooms]);

  if (roomID != null) return <Redirect to={`/rooms/${roomID}`} />;

  return (
    <main className={classes.root}>
      <div className={classes.creation}>
        <Typography variant="h4" gutterBottom>
          {`Welcome${userProfile ? ` ${userProfile.username}` : ''}!`}
        </Typography>
        <CreateGameButton onSubmit={createGameRoom} />
      </div>
      <div>
        <RoomsList rooms={rooms} onJoin={onJoin} />
      </div>
    </main>
  );
}
