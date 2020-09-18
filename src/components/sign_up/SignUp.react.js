import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {useHistory} from 'react-router-dom';

import * as ROUTES from 'constants/routes';

function SignUpForm() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => history.replace(ROUTES.HOME));
  }

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

function SignUp() {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
