import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import CreateGameButton from 'components/create_game/CreateGameButton.react';

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
  },
});

export default function Home() {
  const classes = useStyles();
  const createGameRoom = useStoreActions((s) => s.createGameRoom);
  const roomID = useStoreState((s) => s.roomID);
  const firebase = useContext(FirebaseContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const profile = await firebase.fetchUserProfile();
      setUserProfile(profile);
    }
    fetchProfile();
  }, [setUserProfile, firebase]);

  return (
    <main className={classes.root}>
      <div className={classes.creation}>
        <Typography variant="h4" gutterBottom>
          {`Welcome${userProfile ? ` ${userProfile.username}` : ''}!`}
        </Typography>
        <CreateGameButton onSubmit={createGameRoom} />
      </div>
    </main>
  );
}
