import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import validate from 'validate.js';
import {CONSTRAINTS} from 'utils/validator';

import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  confirmationPassword: '',
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
  submit: {
    marginTop: 16,
    width: '100%',
    position: 'relative',
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  button: {
    width: '100%',
    minHeight: 36,
  },
});

function SignUpForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const [formState, setFormState] = useState(INITIAL_STATE);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const {username, email, password, confirmationPassword} = formState;

    const validation = validate(
      {username, email, password, confirmationPassword},
      CONSTRAINTS.SIGN_UP,
    );

    if (validation) {
      // TODO: Show validation errors
      console.log(validation);
      return;
    }

    setLoading(true);

    firebase
      .createUserWithEmailAndPassword(email, password)
      .then((result) =>
        firebase.firestore.collection('Users').doc(result.user.uid).set({
          username,
          email,
        }),
      )
      .then(() => {
        setFormState({...INITIAL_STATE});
        setLoading(false);
        history.replace(ROUTES.HOME);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  function onChange(event) {
    setFormState({...formState, [event.target.name]: event.target.value});
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form className={classes.form} onSubmit={onSubmit} noValidate>
        <TextField
          name="username"
          className={classes.field}
          value={formState.username}
          onChange={onChange}
          label="Username"
          variant="outlined"
        />
        <TextField
          type="email"
          name="email"
          className={classes.field}
          value={formState.email}
          onChange={onChange}
          label="Email"
          variant="outlined"
        />
        <FormControl className={classes.field} variant="outlined">
          <InputLabel htmlFor="sign-up-password">Password</InputLabel>
          <OutlinedInput
            id="sign-up-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formState.password}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <FormControl className={classes.field} variant="outlined">
          <InputLabel htmlFor="sign-up-confirmation-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="sign-up-confirmation-password"
            name="confirmationPassword"
            type={showConfirmationPassword ? 'text' : 'password'}
            value={formState.confirmationPassword}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
                  edge="end"
                >
                  {showConfirmationPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={135}
          />
        </FormControl>
        <div className={classes.submit}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {!loading && 'Sign Up'}
          </Button>
          {loading && <CircularProgress size={24} className={classes.submitProgress} />}
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
