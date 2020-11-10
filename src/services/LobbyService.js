import ky from 'ky';
import {GAME_NAME} from 'game/config';
import {BGIO_SERVER_URL} from 'game/config/client';

// export interface Player {
//   id: number;
//   name?: string;
// }

// export interface RoomMetadata {
//   players: Player[];
//   matchID: string;
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

  async createRoom({numPlayers, setupData}) {
    const players = Number.parseInt(numPlayers, 10);
    const data = await this.api
      .post('create', {json: {numPlayers: players, setupData}})
      .json();
    return data.matchID;
  }

  async joinRoom({roomID, playerID, playerName}) {
    const {playerCredentials} = await this.api
      .post(roomID + '/join', {
        json: {playerID, playerName},
      })
      .json();

    return playerCredentials;
  }

  getRoomMetadata(roomID) {
    return this.api.get(roomID).json();
  }

  async getRooms() {
    const data = await this.api.get().json();
    return data.matches;
  }
}
