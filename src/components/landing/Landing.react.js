import React from 'react';
import {useState, useEffect} from 'react';

import useSocketClient from 'hooks/useSocketClient';
import useSocketSubscription from 'hooks/useSocketSubscription';

import * as ROUTES from 'constants/routes';

import {Link} from 'react-router-dom';

function Landing() {
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
      {/* <Link to={ROUTES.AUTHENTICATION}>
        <button>Go to Authentication</button>
      </Link> */}
      <Link to={ROUTES.SIGN_IN}>
        <button>Go to Sign In Form</button>
      </Link>
      <Link to={ROUTES.SIGN_UP}>
        <button>Go to Sign Up</button>
      </Link>
      <button onClick={handleClick}>Landing Page</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Landing;
