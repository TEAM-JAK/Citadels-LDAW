import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {AUTH_ERRORS} from 'utils/Firebase';
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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';
import validator from 'validator';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as ROUTES from 'constants/routes';

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
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: null,
    password: null,
  });

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
        history.replace(ROUTES.HOME);
      })
      .catch(() => {
        // TODO: Handle errors
      });
  }

  function onSubmit(event) {
    event.preventDefault();

    let errors = {
      email: null,
      password: null,
    };

    if (!validator.isEmail(fields.email)) {
      errors = {...errors, email: 'Must be a valid email'};
    }

    if (validator.isEmpty(fields.password)) {
      errors = {...errors, password: 'Must not be empty'};
    }

    setFieldErrors(errors);

    const noNullErrors = Object.keys(errors).reduce((acc, current) => {
      if (errors[current] == null) {
        return acc;
      }
      acc[current] = errors[current];
      return acc;
    }, {});

    if (Object.keys(noNullErrors).length !== 0) {
      return;
    }

    setLoading(true);

    firebase
      .signInWithEmailAndPassword(fields.email, fields.password)
      .then(() => {
        setLoading(false);
        history.replace(ROUTES.HOME);
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === AUTH_ERRORS.USER_NOT_FOUND) {
          setFieldErrors({...fieldErrors, email: 'Not found'});
        } else if (err.code === AUTH_ERRORS.WRONG_PASSWORD) {
          setFieldErrors({...fieldErrors, password: 'Incorrect password'});
        }
        setLoading(false);
      });
  }

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
      <form noValidate className={classes.form} onSubmit={onSubmit} method="POST">
        <TextField
          type="email"
          name="email"
          className={classes.field}
          value={fields.email}
          onChange={(e) => setFields({...fields, email: e.target.value})}
          label="Email"
          variant="outlined"
          error={fieldErrors.email != null}
          helperText={fieldErrors.email}
        />
        <FormControl
          className={classes.field}
          variant="outlined"
          error={fieldErrors.password != null}
        >
          <InputLabel htmlFor="sign-in-password">Password</InputLabel>
          <OutlinedInput
            id="sign-in-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={fields.password}
            onChange={(e) => setFields({...fields, password: e.target.value})}
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
          {fieldErrors.password != null ? (
            <FormHelperText>{fieldErrors.password}</FormHelperText>
          ) : null}
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
