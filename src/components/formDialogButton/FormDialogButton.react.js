import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateGameDialog from 'components/formDialogButton/CreateGameDialog.react';

function FormDialogButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{float: 'right', marginBottom: '20px'}}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Game
      </Button>
      <CreateGameDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default FormDialogButton;
