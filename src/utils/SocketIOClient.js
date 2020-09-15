import io from 'socket.io-client';

class SocketIOClient {
  // Maybe pass the port here
  constructor() {
    // Allow only ws protocol
    this.socket = io('http://localhost:4002', {transports: ['websocket']});
  }
}

export default SocketIOClient;
