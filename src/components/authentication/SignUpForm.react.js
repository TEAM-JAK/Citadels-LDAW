import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginTop: 16,
  },
  title: {
    marginBottom: 24,
  },
});

function SignUpForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const classes = useStyles();

  function onSubmit(event) {
    event.preventDefault();
    const {username, email, passwordOne} = formState;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) =>
        firebase.db.ref(`users/${authUser.user.uid}`).set({
          username,
          email,
        }),
      )
      .then(() => {
        setFormState({...INITIAL_STATE});
        history.replace(ROUTES.HOME);
      })
      .catch((error) => setFormState({...formState, [formState.error]: error}));
  }

  function onChange(event) {
    setFormState({...formState, [event.target.name]: event.target.value});
  }

  const isInvalid =
    formState.passwordOne !== formState.passwordTwo ||
    formState.passwordOne === '' ||
    formState.email === '' ||
    formState.username === '';

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField className={classes.field} label="Filled" variant="filled" />
        <TextField className={classes.field} label="Filled" variant="filled" />
        {formState.error && <Typography>{formState.error.message}</Typography>}
      </form>
    </div>
  );
}

export default SignUpForm;
