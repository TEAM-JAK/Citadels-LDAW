import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from 'components/home/Home.react';
import Authentication from 'components/authentication/Authentication.react';
import AuthRenderer from 'components/shared/AuthRenderer.react';
import NoAuthRenderer from 'components/shared/NoAuthRenderer.react';
import * as ROUTES from 'constants/routes';

const App = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.HOME}>
        <AuthRenderer fallback={<p>Loading...</p>}>
          <Home />
        </AuthRenderer>
      </Route>
      <Route path={ROUTES.AUTHENTICATION}>
        <NoAuthRenderer fallback={<p>Loading...</p>}>
          <Authentication />
        </NoAuthRenderer>
      </Route>
    </Switch>
  </Router>
);

export default App;
