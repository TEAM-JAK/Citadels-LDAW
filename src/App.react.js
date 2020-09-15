import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// import PrivateRoute from 'components/shared/PrivateRoute.react';
import Home from 'components/home/Home.react';
import SignUp from 'components/sign_up/SignUp.react';
import * as ROUTES from 'constants/routes';

const App = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <Route path={ROUTES.SIGN_UP}>
        <SignUp />
      </Route>
    </Switch>
  </Router>
);

export default App;
