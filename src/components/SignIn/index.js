import React, {Component, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

function SignInFormBase(props) {
  const [formState, setFormState] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(formState.email, formState.password)
      .then(() => {
        setFormState({...INITIAL_STATE});
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setFormState({...formState, [formState.error]: error});
      });

    event.preventDefault();
  };

  const onChange = (event) => {
    setFormState({...formState, [event.target.name]: event.target.value});
  };

  const isInvalid = formState.password === '' || formState.email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={formState.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={formState.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export {SignInForm};
