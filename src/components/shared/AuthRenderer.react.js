import React from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {useContext, useState, useEffect} from 'react';
import {Redirect, Route, useHistory} from 'react-router-dom';

import * as ROUTES from 'constants/routes';

function AuthRenderer({children, fallback}) {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  // Initial state
  const [userState, setUserState] = useState('LOADING');

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((logged) => {
      if (logged === null) {
        history.push(ROUTES.SIGN_IN);
        return;
      }
      setUserState('LOGGED');
    });
    return function () {
      // Cleanup
      listener();
    };
  }, [setUserState, history]);

  if (userState === 'LOADING') {
    return fallback;
  }

  return children;
}

export default AuthRenderer;
