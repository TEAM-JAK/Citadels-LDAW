import React from 'react';

import useSocketClient from 'hooks/useSocketClient';

function Home() {
  const socket = useSocketClient();

  function handleClick() {
    // TODO: Make it so only message is used
    socket.emit('message', 'hi');
  }

  return (
    <div>
      <button onClick={handleClick}>Landing Page</button>
    </div>
  );
}

export default Home;
