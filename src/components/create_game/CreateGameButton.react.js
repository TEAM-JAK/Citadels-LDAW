import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CreateGameDialog from 'components/create_game/CreateGameDialog.react';
import useBoolean from 'hooks/useBoolean';

export default function CreateGameButton(props) {
  const {value: open, setTrue, setFalse} = useBoolean(false);

  function onSubmit(data) {
    setFalse();
    props.onSubmit(data);
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setTrue()}>
        Create Game
      </Button>
      <CreateGameDialog open={open} onClose={() => setFalse()} onSubmit={onSubmit} />
    </>
  );
}
