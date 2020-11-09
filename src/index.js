import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-nunito';
import 'index.css';
import {StoreProvider} from 'easy-peasy';
import {initializeStore} from 'store';
import {PLAYER_STORAGE_KEY} from 'store/store';
import App from 'App.react';
import GameApp from 'components/game/GameApp.react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import Firebase from 'utils/Firebase';
// Import the wrapper component, and the the creator function
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

// Create a new theme using Nunito
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nunito, Roboto, sans-serif',
  },
});

const savedPlayer = localStorage.getItem(PLAYER_STORAGE_KEY);

const store = initializeStore({
  activeRoomPlayer: savedPlayer ? JSON.parse(savedPlayer) : null,
});

ReactDOM.render(
  <StoreProvider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      {/* <SocketContext.Provider value={new SocketIOClient()}> */}
      <MuiThemeProvider theme={theme}>
        {/* <App /> */}
        <GameApp />
      </MuiThemeProvider>
      {/* </SocketContext.Provider> */}
    </FirebaseContext.Provider>
  </StoreProvider>,
  document.getElementById('root'),
);
