import React from 'react';
import {useContext, useState, useEffect} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';

import FormDialogButton from 'components/formDialogButton/FormDialogButton.react';
import RoomsTable from 'components/room/RoomsTable.react';
import GeneralChat from 'components/generalChat/GeneralChat.react';

import useSocketSubscription from 'hooks/useSocketSubscription';
import useSocketClient from 'hooks/useSocketClient';
import {Paper, Typography} from '@material-ui/core';

function Home() {
  const containerStyle = {
    width: '1000px',
    height: '500px',
    backgroundColor: 'rgb(238, 238, 238)',
    padding: '25px',
    position: 'relative',
  };

  const upperRowStyle = {
    display: 'flex',
    margin: '20px 0',
  };

  const lowerRowStyle = {
    display: 'flex',
    margin: '20px 0',
  };

  const firebase = useContext(FirebaseContext);

  const [errors, data] = useSocketSubscription(['TEST']);
  const socket = useSocketClient();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data != null) {
      setMessages([...messages, data]);
    }
  }, [data, setMessages]);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await firebase.doGetUserProfile();

      setUserData(userData);
    }
    fetchUserData();
  }, []);

  return (
    <Paper variant="outlined">
      <div style={containerStyle}>
        <div style={upperRowStyle}>
          <div>
            <Typography variant="h5" gutterBottom>
              CITADELS
            </Typography>
          </div>
          <div style={{marginLeft: 'auto', marginRight: 0}}>
            <Typography variant="h5" gutterBottom>
              Hello there,{' '}
              <span style={{color: 'green'}}>
                {userData ? userData.username : 'User'}
              </span>
              !
            </Typography>
            {/* <button onClick={() => socket.emit('message', 'Hola')}>
            Send message to ws server
          </button> */}
          </div>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>{message.text}</li>
            ))}
          </ul>
        </div>
        <div style={lowerRowStyle}>
          <div>
            <FormDialogButton />
            <RoomsTable />
          </div>
          <GeneralChat username={userData ? userData.username : ''} />
        </div>
      </div>
    </Paper>
  );
}

export default Home;
