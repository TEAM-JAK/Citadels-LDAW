import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from '../shared/PrivateRoute.react';

// import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
// import SignInPage from '../SignIn';
// import HomePage from '../Home';
// import AccountPage from '../Account';
// import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path={ROUTES.LANDING}>
        <LandingPage />
      </PrivateRoute>
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    </Switch>
  </Router>
);

export default App;
