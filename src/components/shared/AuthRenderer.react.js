import React from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {useContext, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import * as ROUTES from 'constants/routes';

function AuthRenderer({children, fallback}) {
  const firebase = useContext(FirebaseContext);
  // Initial state
  const [state, setState] = useState({loading: true, authenticated: false});

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((logged) => {
      if (logged === null) {
        setState({loading: false, authenticated: false});
        return;
      }
      setState({loading: false, authenticated: true});
    });
    return function () {
      // Cleanup
      listener();
    };
  }, [setState, firebase]);

  if (state.loading) {
    return fallback;
  }

  if (!state.loading && !state.authenticated) {
    return <Redirect to={ROUTES.AUTHENTICATION} />;
  }

  return children;
}

export default AuthRenderer;
