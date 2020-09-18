import {useEffect, useState} from 'react';
import useSocketClient from 'hooks/useSocketClient';

function useSocketSubscription(types) {
  const socket = useSocketClient();

  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    function subscribe(payload) {
      const payloadParsed = JSON.parse(payload);
      if (types.includes(payloadParsed.type)) {
        setData(payloadParsed.data);
      }
    }

    socket.on('message', subscribe);

    return function () {
      socket.off('message', subscribe);
    };
  }, [setData]);

  return [errors, data];
}

export default useSocketSubscription;
