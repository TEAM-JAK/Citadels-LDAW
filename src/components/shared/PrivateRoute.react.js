import React from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';

import * as ROUTES from 'constants/routes';

function PrivateRoute({children, ...rest}) {
  const firebase = useContext(FirebaseContext);
  const user = firebase.auth.currentUser;

  return (
    <Route
      {...rest}
      render={({location}) => {
        return user !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.SIGN_UP,
              state: {from: location},
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
