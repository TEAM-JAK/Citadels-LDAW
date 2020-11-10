import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import validator from 'validator';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    minWidth: 768,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: 16,
  },
});

function CreateGameDialog(props) {
  const classes = useStyles();
  const [isPrivateGame, setIsPrivateGame] = useState(false);
  const [fields, setFields] = useState({
    roomName: '',
    numberOfPlayers: '4',
  });
  const [fieldErrors, setFieldErrors] = useState({
    roomName: null,
    numberOfPlayers: null,
  });

  const handleFormOnSubmit = (event) => {
    let errors = {
      roomName: null,
      numberOfPlayers: null,
    };

    if (validator.isEmpty(fields.roomName)) {
      errors = {...errors, roomName: 'Must not be empty'};
    }

    if (validator.isEmpty(fields.numberOfPlayers)) {
      errors = {...errors, numberOfPlayers: 'Must not be empty'};
    }

    setFieldErrors(errors);

    const noNullErrors = Object.keys(errors).reduce((acc, current) => {
      if (errors[current] == null) {
        return acc;
      }
      acc[current] = errors[current];
      return acc;
    }, {});

    if (Object.keys(noNullErrors).length !== 0) {
      return;
    }

    props.onSubmit({
      setupData: {roomName: fields.roomName},
      numPlayers: fields.numberOfPlayers,
    });
  };

  return (
    <Dialog
      classes={{paper: classes.paper}}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="create-game-dialog"
    >
      <DialogTitle id="create-game-dialog">Create a Game</DialogTitle>
      <DialogContent>
        <div className={classes.form}>
          <TextField
            fullWidth
            className={classes.field}
            label="Room Name"
            value={fields.roomName}
            onChange={(e) => setFields({...fields, roomName: e.target.value})}
            error={fieldErrors.roomName != null}
            helperText={fieldErrors.roomName}
          />
          <FormControl
            className={classes.field}
            error={fieldErrors.numberOfPlayers != null}
          >
            <InputLabel id="create-game-number-players-select-label">
              Number Of Players
            </InputLabel>
            <Select
              labelId="create-game-number-players-select-label"
              id="create-game-number-players-select"
              value={fields.numberOfPlayers}
              onChange={(e) => setFields({...fields, numberOfPlayers: e.target.value})}
            >
              <MenuItem value={4}>
                <em>4</em>
              </MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
            {fieldErrors.numberOfPlayers != null ? (
              <FormHelperText>{fieldErrors.numberOfPlayers}</FormHelperText>
            ) : null}
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormOnSubmit} color="primary">
          Create Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateGameDialog;
