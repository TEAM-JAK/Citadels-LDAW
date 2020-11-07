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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';

import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
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
  socialContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  social: {
    border: '1px solid #ddd',
    borderRadius: '50%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    cursor: 'pointer',
  },
});

function SignInForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState(INITIAL_STATE);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  function onFacebookLogin() {
    firebase.auth
      .signInWithPopup(firebase.facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        return firebase.firestore.collection('Users').doc(user.uid).set({
          username: user.displayName,
          email: user.email,
        });
      })
      .then(() => {
        setFormState({...INITIAL_STATE});
        history.replace(ROUTES.HOME);
      })
      .catch((error) => {
        // TODO: Handle errors
        console.log(error);
      });
  }

  function onSubmit(event) {
    event.preventDefault();
    const {email, password} = formState;

    const validation = validate({email, password}, CONSTRAINTS.SIGN_IN);

    if (validation) {
      // TODO: Show validation errors
      return;
    }

    setLoading(true);

    firebase
      .signInWithEmailAndPassword(email, password)
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

  const isInvalid = formState.password === '' || formState.email === '';

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3" align="center" gutterBottom>
        Sign In
      </Typography>
      <div className={classes.socialContainer}>
        <button onClick={onFacebookLogin} className={classes.social}>
          <FontAwesomeIcon icon={faFacebookF} />
        </button>
      </div>
      <form noValidate className={classes.form} onSubmit={onSubmit}>
        <TextField
          type="email"
          name="email"
          className={classes.field}
          value={formState.email}
          onChange={onChange}
          label="Email"
          variant="outlined"
          id="sign-in-email-text-field"
        />
        <FormControl className={classes.field} variant="outlined">
          <InputLabel htmlFor="sign-in-password">Password</InputLabel>
          <OutlinedInput
            id="sign-in-password"
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
        <div className={classes.submit}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            id="sign-in-button"
          >
            {!loading && 'Sign In'}
          </Button>
          {loading && <CircularProgress size={24} className={classes.submitProgress} />}
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
