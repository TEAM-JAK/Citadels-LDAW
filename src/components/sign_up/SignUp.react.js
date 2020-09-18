import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

function SignUpFormBase(props) {
  const [formState, setFormState] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    const {username, email, passwordOne} = formState;

    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
          .then(() => {
            setFormState(...INITIAL_STATE);
            props.history.push(ROUTES.HOME);
          })
          .catch((error) => {
            setFormState({...formState, [formState.error]: error});
          });
      })
      .catch((error) => {
        setFormState({...formState, [formState.error]: error});
      });

    event.preventDefault();
  };

  const onChange = (event) => {
    setFormState({...formState, [event.target.name]: event.target.value});
  };

  const isInvalid =
    formState.passwordOne !== formState.passwordTwo ||
    formState.passwordOne === '' ||
    formState.email === '' ||
    formState.username === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={formState.username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={formState.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={formState.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={formState.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export default SignUp;
