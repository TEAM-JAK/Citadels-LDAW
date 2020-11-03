import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {Paper, ListItem, TextField, ListItemText, Typography} from '@material-ui/core';

const socket = io.connect('http://localhost:5000');

function GeneralChat(props) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', ({username, message}) => {
      setChat([...chat, {username: username, message}]);
    });
  }, [{username: props.username, message}, setChat]);

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = (e) => {
    if (e.keyCode === 13) {
      socket.emit('chat message', {username: props.username, message});
      setMessage('');
    }
  };

  return (
    <div style={{margin: '0 40px', width: '300px'}}>
      <Paper variant="outlined">
        <div
          style={{
            backgroundColor: '#F8F8FF',
            height: '300px',
            position: 'relative',
          }}
        >
          <div style={{height: '244px', scrollbarWidth: 'thin', overflowY: 'scroll'}}>
            {chat.map(({username, message}, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={
                    <Typography
                      style={{color: props.username === username ? 'green' : 'purple'}}
                    >
                      {username}
                    </Typography>
                  }
                  secondary={message}
                />
                {/* <span style={{color: 'green'}}>{username} </span>
                <span>{message}</span> */}
              </ListItem>
            ))}
          </div>
          <TextField
            fullWidth={true}
            name="message"
            onChange={handleMessageInput}
            value={message}
            placeholder="Global Chat Message"
            onKeyDown={onMessageSubmit}
            variant="outlined"
            style={{position: 'absolute', bottom: 0}}
          />
        </div>
      </Paper>
    </div>
  );
}

export default GeneralChat;
