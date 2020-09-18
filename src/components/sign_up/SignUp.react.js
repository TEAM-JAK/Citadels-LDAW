import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {useHistory} from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

function SignUpForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [formState, setFormState] = useState(INITIAL_STATE);

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
        console.log('here');
        setFormState(...INITIAL_STATE);
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
    <form onSubmit={onSubmit}>
      <label>
        Username:
        <input
          name="username"
          value={formState.username}
          onChange={onChange}
          type="text"
          placeholder="Full Name"
        />
      </label>
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
        Password One:
        <input
          name="passwordOne"
          value={formState.passwordOne}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </label>
      <label>
        Password Two:
        <input
          name="passwordTwo"
          value={formState.passwordTwo}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
}

function SignUp() {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
