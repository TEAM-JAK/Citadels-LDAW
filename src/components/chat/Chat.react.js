import React, {useState, useEffect} from 'react';
import {Paper, ListItem, TextField, ListItemText, Typography} from '@material-ui/core';
import useSocketClient from 'hooks/useSocketClient';

function Chat(props) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const socket = useSocketClient();

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
    <Paper variant="outlined">
      <div
        style={{
          backgroundColor: '#F8F8FF',
          position: 'relative',
          height: props.fullHeight ? 'calc(80vh + 56px)' : '300px',
        }}
      >
        <div
          style={{
            height: props.fullHeight ? '80vh' : '244px',
            scrollbarWidth: 'thin',
            overflowY: 'scroll',
          }}
        >
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
  );
}

export default Chat;
