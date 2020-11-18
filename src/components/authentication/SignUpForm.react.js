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
import * as ROUTES from 'constants/routes';
import validator from 'validator';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    confirmationPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    username: null,
    email: null,
    password: null,
    confirmationPassword: null,
  });
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();

    let errors = {
      username: null,
      email: null,
      password: null,
      confirmationPassword: null,
    };

    if (validator.isEmpty(fields.username)) {
      errors = {...errors, username: 'Must not be empty'};
    }

    if (!validator.isEmail(fields.email)) {
      errors = {...errors, email: 'Must be a valid email'};
    }

    if (!validator.isLength(fields.password, {min: 6})) {
      errors = {...errors, password: 'Must be at least six characters long'};
    }

    if (
      errors.password == null &&
      !validator.equals(fields.password, fields.confirmationPassword)
    ) {
      errors = {...errors, confirmationPassword: 'Passwords must be equal'};
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
      .createUserWithEmailAndPassword(fields.email, fields.password)
      .then((result) =>
        firebase.firestore.collection('Users').doc(result.user.uid).set({
          username: fields.username,
          email: fields.email,
        }),
      )
      .then(() => {
        setLoading(false);
        history.replace(ROUTES.HOME);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form className={classes.form} onSubmit={onSubmit} noValidate method="POST">
        <TextField
          name="username"
          className={classes.field}
          value={fields.username}
          onChange={(e) => setFields({...fields, username: e.target.value})}
          label="Username"
          variant="outlined"
          error={fieldErrors.username != null}
          helperText={fieldErrors.username}
        />
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
          <InputLabel htmlFor="sign-up-password">Password</InputLabel>
          <OutlinedInput
            id="sign-up-password"
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
        <FormControl
          className={classes.field}
          variant="outlined"
          error={fieldErrors.confirmationPassword != null}
        >
          <InputLabel htmlFor="sign-up-confirmation-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="sign-up-confirmation-password"
            name="confirmationPassword"
            type={showConfirmationPassword ? 'text' : 'password'}
            value={fields.confirmationPassword}
            onChange={(e) =>
              setFields({...fields, confirmationPassword: e.target.value})
            }
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
          {fieldErrors.confirmationPassword != null ? (
            <FormHelperText>{fieldErrors.confirmationPassword}</FormHelperText>
          ) : null}
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
