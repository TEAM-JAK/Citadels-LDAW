<<<<<<< Updated upstream
import React from 'react';
import {useContext, useState, useEffect} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';

import FormDialogButton from 'components/formDialogButton/FormDialogButton.react';
import RoomsTable from 'components/room/RoomsTable.react';
import GeneralChat from 'components/generalChat/GeneralChat.react';

import useSocketSubscription from 'hooks/useSocketSubscription';
import useSocketClient from 'hooks/useSocketClient';

function Home(props) {
  const firebase = useContext(FirebaseContext);
=======
import React from 'components/home/node_modules/react';
import {useState, useEffect} from 'components/home/node_modules/react';

import useSocketClient from 'components/home/node_modules/hooks/useSocketClient';
import useSocketSubscription from 'components/home/node_modules/hooks/useSocketSubscription';
>>>>>>> Stashed changes

  const [errors, data] = useSocketSubscription(['TEST']);
  const socket = useSocketClient();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data != null) {
      setMessages([...messages, data]);
    }
  }, [data, setMessages]);

  useEffect(async () => {
    const userData = await firebase.doGetUserProfile();
    setUserData(userData);
  }, []);

  return (
    <>
      <div style={{display: 'flex'}}>
        <div>
          <h1>{userData ? userData.username : 'Usuario desconocido'}</h1>
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
        <RoomsTable />
      </div>
      {/* <GeneralChat /> */}
    </>
  );
}

export default Home;
