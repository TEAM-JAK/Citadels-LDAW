import React from 'react';
import {Link} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import {useContext, useState} from 'react';
import Firebase, {FirebaseContext} from '../../components/Firebase';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

function SignUpForm() {
  const firebase = useContext(FirebaseContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    firebase.doCreateUserWithEmailAndPassword(email, password);
    console.log(firebase);
  }

  function onChange(event) {}

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmationPasswordChange(event) {
    setConfirmationPassword(event.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />{' '}
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />{' '}
      </label>
      <label>
        Name:
        <input type="password" value={password} onChange={handlePasswordChange} />{' '}
      </label>
      <label>
        Name:
        <input
          type="password"
          value={confirmationPassword}
          onChange={handleConfirmationPasswordChange}
        />{' '}
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export {SignUpForm, SignUpLink};
