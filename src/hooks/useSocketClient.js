import {useContext} from 'react';
import SocketContext from 'components/socket/SocketContext.react';

function useSocketClient() {
  const context = useContext(SocketContext);
  return context.socket;
}

export default useSocketClient;
