import React from 'react';
import {useState, useEffect} from 'react';

import FormDialogButton from 'components/formDialogButton/FormDialogButton.react';
import useSocketSubscription from 'hooks/useSocketSubscription';
import useSocketClient from 'hooks/useSocketClient';

function Home() {
  const [errors, data] = useSocketSubscription(['TEST']);
  const socket = useSocketClient();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data != null) {
      setMessages([...messages, data]);
    }
  }, [data, setMessages]);

  return (
    <div>
      <h1>This is HOME</h1>
      <FormDialogButton />
      <button onClick={() => socket.emit('message', 'Hola')}>
        Send message to ws server
      </button>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
