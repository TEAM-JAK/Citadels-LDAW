import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function GeneralChat(props) {
  const [username, setUsername] = useState(props.username);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', ({message}) => {
      setChat([...chat, {username, message}]);
    });
  }, [{username, message}, setChat]);

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = () => {
    socket.emit('chat message', {message});
    setMessage('');
  };

  return (
    <div>
      {/* <span>Username</span> */}
      {/* <input
          name="username"
          onChange={(e) => this.onTextChange(e)}
          value={this.state.username}
        /> */}
      <span>Message</span>
      <input name="message" onChange={handleMessageInput} value={message} />
      <button onClick={onMessageSubmit}>Send</button>
      <div>
        {chat.map(({message}, i) => (
          <div key={i}>
            <span style={{color: 'green'}}>{username} </span>
            <span>{message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneralChat;
