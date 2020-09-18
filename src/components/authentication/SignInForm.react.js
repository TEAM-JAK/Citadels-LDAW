import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {Link, useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

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
});

function SignInForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState(INITIAL_STATE);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const {email, password} = formState;

    setLoading(true);

    firebase
      .doSignInWithEmailAndPassword(email, password)
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
      <form className={classes.form} onSubmit={onSubmit}>
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
