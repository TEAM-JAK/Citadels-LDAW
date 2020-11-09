import ky from 'ky';
import {GAME_NAME, BGIO_SERVER_URL} from 'game/config';

// export interface Player {
//   id: number;
//   name?: string;
// }

// export interface RoomMetadata {
//   players: Player[];
// }

// export interface ActiveRoomPlayer {
//   playerID: number;
//   credential: string;
// }

// export interface JoinRoomParams {
//   roomID: string;
//   playerID: number;
//   playerName: string;
// }

export default class LobbyService {
  constructor() {
    this.api = ky.create({prefixUrl: `${BGIO_SERVER_URL}/games/${GAME_NAME}`});
  }

  async createRoom(numPlayers) {
    const data = await this.api.post('create', {json: {numPlayers}}).json();

    return data.gameID;
  }

  async joinRoom({roomID, ...json}) {
    const {playerCredentials} = await this.api
      .post(roomID + '/join', {
        json: json,
      })
      .json();

    return playerCredentials;
  }

  getRoomMetadata(roomID) {
    return this.api.get(roomID).json();
  }

  getRooms() {
    return this.api.get().json();
  }
}
