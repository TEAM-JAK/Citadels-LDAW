import {action, thunk} from 'easy-peasy';

// export interface StoreModel {
//   rooms: RoomMetadata[];
//   roomID: string | null;
//   setRoomID: Action<StoreModel, string>;
//   createGameRoom: Thunk<StoreModel, number, StoreInjections>;
//   roomMetadata: RoomMetadata | null;
//   setRoomMetadata: Action<StoreModel, RoomMetadata>;
//   loadRoomMetadata: Thunk<StoreModel, string, StoreInjections>;
//   activeRoomPlayer: ActiveRoomPlayer | null;
//   setActiveRoomPlayer: Action<StoreModel, ActiveRoomPlayer>;
//   joinRoom: Thunk<StoreModel, JoinRoomParams, StoreInjections>;
//   reset: Action;
// }

// 'player' refers to users player in the game room
export const PLAYER_STORAGE_KEY = 'citadels_player';

export let initState = {};
export const setInitState = (state) => {
  if (state) initState = state;
};

export const store = {
  rooms: [],
  setRooms: action((state, payload) => {
    state.rooms = payload;
  }),
  loadRooms: thunk(async (actions, payload, {injections}) => {
    const rooms = await injections.lobbyApi.getRooms();
    actions.setRooms(rooms);
  }),

  roomID: null,
  setRoomID: action((state, payload) => {
    state.roomID = payload;
  }),
  createGameRoom: thunk(async (actions, payload, {injections}) => {
    const roomID = await injections.lobbyApi.createRoom(payload);
    actions.setRoomID(roomID);
  }),

  roomMetadata: null,
  setRoomMetadata: action((state, payload) => {
    state.roomMetadata = payload;
  }),
  loadRoomMetadata: thunk(async (actions, payload, {injections}) => {
    const metadata = await injections.lobbyApi.getRoomMetadata(payload);
    actions.setRoomMetadata(metadata);
  }),

  activeRoomPlayer: null,
  setActiveRoomPlayer: action((state, payload) => {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(payload));
    state.activeRoomPlayer = payload;
  }),
  joinRoom: thunk(async (actions, payload, {injections}) => {
    const playerCredentials = await injections.lobbyApi.joinRoom(payload);
    actions.setActiveRoomPlayer({
      credential: playerCredentials,
      playerID: payload.playerID,
    });
  }),

  reset: action(() => initState),
};
