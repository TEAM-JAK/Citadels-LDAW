import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {Link, useHistory} from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  emailSignIn: '',
  passwordSignIn: '',
  errorSignIn: null,
  usernameSignUp: '',
  emailSignUp: '',
  passwordOneSignUp: '',
  passwordTwoSignUp: '',
  errorSignUp: null,
};

function SignInForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [formState, setFormState] = useState(INITIAL_STATE);

  function onSubmit(event) {
    event.preventDefault();
    const {emailSignIn, passwordSignIn} = formState;

    firebase
      .doSignInWithEmailAndPassword(emailSignIn, passwordSignIn)
      .then(() => {
        setFormState(...INITIAL_STATE);
        history.replace(ROUTES.HOME);
      })
      .catch((error) => setFormState({...formState, [formState.errorSignIn]: error}));
  }

  function onChange(event) {
    setFormState({...formState, [event.target.name]: event.target.value});
  }

  const isInvalid = formState.passwordSignIn === '' || formState.emailSignIn === '';

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input
          name="email"
          value={formState.emailSignIn}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          value={formState.passwordSignIn}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {formState.errorSignIn && <p>{formState.error.message}</p>}
    </form>
  );
}

function SignUpForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [formState, setFormState] = useState(INITIAL_STATE);

  function onSubmit(event) {
    event.preventDefault();
    const {usernameSignUp, emailSignUp, passwordOneSignUp} = formState;

    firebase
      .doCreateUserWithEmailAndPassword(emailSignUp, passwordOneSignUp)
      .then((authUser) =>
        firebase.db.ref(`users/${authUser.user.uid}`).set({
          usernameSignUp,
          emailSignUp,
        }),
      )
      .then(() => {
        console.log('here');
        setFormState(...INITIAL_STATE);
        history.replace(ROUTES.HOME);
      })
      .catch((error) => setFormState({...formState, [formState.errorSignUp]: error}));
  }

  function onChange(event) {
    setFormState({...formState, [event.target.name]: event.target.value});
  }

  const isInvalid =
    formState.passwordOneSignUp !== formState.passwordTwoSignUp ||
    formState.passwordOneSignUp === '' ||
    formState.emailSignUp === '' ||
    formState.usernameSignUp === '';

  return (
    <form onSubmit={onSubmit}>
      <label>
        Username:
        <input
          name="username"
          value={formState.usernameSignUp}
          onChange={onChange}
          type="text"
          placeholder="Full Name"
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={formState.emailSignUp}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
      </label>
      <label>
        Password One:
        <input
          name="passwordOne"
          value={formState.passwordOneSignUp}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </label>
      <label>
        Password Two:
        <input
          name="passwordTwo"
          value={formState.passwordTwoSignUp}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {formState.errorSignUp && <p>{formState.errorSignUp.message}</p>}
    </form>
  );
}

function Authentication() {
  return (
    <div>
      <h1>SignUp</h1>
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

export default Authentication;
