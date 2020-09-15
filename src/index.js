import React from 'react';
import ReactDOM from 'react-dom';

import 'index.css';
import * as serviceWorker from 'serviceWorker';

import App from 'App.react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import SocketContext from 'components/socket/SocketContext.react';

import Firebase from 'utils/Firebase';
import SocketIOClient from 'utils/SocketIOClient';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <SocketContext.Provider value={new SocketIOClient()}>
      <App />
    </SocketContext.Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
