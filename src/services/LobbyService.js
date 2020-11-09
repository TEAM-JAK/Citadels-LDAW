import ky from 'ky';

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
    this.api = ky.create({prefixUrl: 'http://localhost:8000/games/citadels'});
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

    return {
      playerCredentials,
    };
  }

  async getRoomMetadata(roomID) {
    return await this.api.get(roomID).json();
  }

  async getRooms() {
    return await this.api.get().json();
  }
}
