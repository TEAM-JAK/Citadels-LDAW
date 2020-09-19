import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FirebaseContext from 'components/firebase/FirebaseContext.react';

const initFormState = {
    roomName : '',
    roomPassword : '',
    numberOfPlayers : '7',  
}


function CreateGameDialog(props) {
    const [isPrivateGame, setIsPrivateGame] = useState(false);
    const [formState, setFormState] = useState(initFormState);

    const firebase = useContext(FirebaseContext);

    const handleFormOnSubmit = (event) => {
        console.log(event);
    };

    const handleChange = (event) => {
        setFormState({...formState, [event.target.name] : event.target.value})
    };

    const handlePrivateGameChange = (event) => {
        setIsPrivateGame(event.target.checked);
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create a Game</DialogTitle>
            <DialogContent>
                <form className="createGameForm" noValidate autoComplete="off">
                    <TextField required
                        id="standard-required"
                        label="Room Name"
                        placeholder="Citadels Game Test"
                        name="roomName"
                        value={formState.roomName}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isPrivateGame}
                                onChange={handlePrivateGameChange}
                                name="checkedIsPrivate"
                                color="primary"
                            />
                        }
                        label="Private Game"
                    />
                    {isPrivateGame ? <TextField
                        id="filled-password-input"
                        label="Room Password"
                        placeholder="pwd"
                        autoComplete="current-password"
                        name="roomPassword"
                        value={formState.roomPassword}
                        onChange={handleChange}
                    /> : null}
                    <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">Number Of Players</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={formState.numberOfPlayers}
                            onChange={handleChange}
                            inputProps={{
                                name: "numberOfPlayers"
                            }}
                        >
                            <MenuItem value={7}>
                                <em>7</em>
                            </MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                        <FormHelperText>Select the number of players</FormHelperText>
                    </FormControl>
                    {/* <TextField required
                id="standard"
                label="Invite Friends"
                placeholder="I have no friends"
                type="search"
            /> */}
                    {/* <p>-Needs further custom like making modifications of a game changing available characters,\n</p>
            <p>-Showing friends to invite as a list</p> */}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.oncClose} color="primary">
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