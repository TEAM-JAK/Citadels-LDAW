import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import RoomsListItem from 'components/home/RoomsListItem.react';

const useStyles = makeStyles({
  root: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
});

export default function RoomsList(props) {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {props.rooms.map((room) => (
        <li key={room.matchID}>
          <RoomsListItem room={room} onJoin={props.onJoin} />
        </li>
      ))}
    </ul>
  );
}
