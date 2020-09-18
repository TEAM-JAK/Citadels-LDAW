import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {Link, useHistory} from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

function SignInForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [formState, setFormState] = useState(INITIAL_STATE);

  function onSubmit(event) {
    event.preventDefault();
    const {username, email, password} = formState;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setFormState(...INITIAL_STATE);
        history.replace(ROUTES.HOME);
      })
      .catch((error) => setFormState({...formState, [formState.error]: error}));
  }

  function onChange(event) {
    setFormState({...formState, [event.target.name]: event.target.value});
  }

  const isInvalid = formState.password === '' || formState.email === '';

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input
          name="email"
          value={formState.email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          value={formState.password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
}

function SignIn() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
