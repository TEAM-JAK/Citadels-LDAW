import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-nunito';
import 'index.css';

import App from 'App.react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import SocketContext from 'components/socket/SocketContext.react';

import Firebase from 'utils/Firebase';
import SocketIOClient from 'utils/SocketIOClient';
// Import the wrapper component, and the the creator function
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import GameApp from 'components/game/GameApp.react';
// Create a new theme using Nunito
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nunito, Roboto, sans-serif',
  },
});

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <SocketContext.Provider value={new SocketIOClient()}>
      <MuiThemeProvider theme={theme}>
        {/* <App /> */}
        <GameApp />
      </MuiThemeProvider>
    </SocketContext.Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
