import {createStore} from 'easy-peasy';
import {setInitState, store} from 'store/store';
import LobbyService from 'services/LobbyService';

// export interface StoreInjections {
//   lobbyApi: LobbyService;
// }

export const initializeStore = (initialState) => {
  setInitState(initialState);
  return createStore(store, {
    initialState,
    injections: {lobbyApi: new LobbyService()},
  });
};
