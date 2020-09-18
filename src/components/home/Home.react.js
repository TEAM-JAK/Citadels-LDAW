import React from 'react';
import {ModalContainer} from '../modalContainer/ModalContainer.react'

function Home() {
  
  const triggerText = 'Create Game';
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
  }

  return (
    <div>
      <h1>This is HOME</h1>
      <ModalContainer triggerText={triggerText} onSubmit={onSubmit} />
    </div>
  );
}

export default Home;
