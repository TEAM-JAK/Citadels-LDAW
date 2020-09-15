import React from 'react';
import {useState, useEffect} from 'react';

import useSocketClient from 'hooks/useSocketClient';
import useSocketSubscription from 'hooks/useSocketSubscription';

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
      <button onClick={handleClick}>Landing Page</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
