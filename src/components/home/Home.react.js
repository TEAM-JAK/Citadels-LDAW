import React from 'react';
import {useState, useEffect} from 'react';

import useSocketClient from 'hooks/useSocketClient';
import useSocketSubscription from 'hooks/useSocketSubscription';

import * as ROUTES from 'constants/routes';

import {Link} from 'react-router-dom';

function Home() {
  const socket = useSocketClient();
  const [errors, data] = useSocketSubscription(['TEST']);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data != null) {
      setItems([...items, data]);
    }
  }, [data]);

  function handleClick() {
    // TODO: Make it so only message is used
    socket.emit('message', 'hi');
  }

  return (
    <div>
      <p>I'm at home</p>
    </div>
  );
}

export default Home;
