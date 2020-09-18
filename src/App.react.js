import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// import PrivateRoute from 'components/shared/PrivateRoute.react';
import Landing from 'components/landing/Landing.react';
import SignUp from 'components/sign_up/SignUp.react';
import SignIn from 'components/sign_in/SignIn.react';
import Authentication from 'components/authentication/Authentication.react';

import AuthRenderer from 'components/shared/AuthRenderer.react';
import * as ROUTES from 'constants/routes';

const App = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.LANDING}>
        <AuthRenderer fallback={<p>Loading...</p>}>
          <Landing />
        </AuthRenderer>
      </Route>
      <Route path={ROUTES.AUTHENTICATION}>
        <Authentication />
      </Route>
      <Route path={ROUTES.SIGN_UP}>
        <SignUp />
      </Route>
      <Route path={ROUTES.SIGN_IN}>
        <SignIn />
      </Route>
    </Switch>
  </Router>
);

export default App;
