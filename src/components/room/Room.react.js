import React from 'react';
import {TableCell, TableRow} from '@material-ui/core';

function Room(props) {
  return (
    <TableRow>
      <TableCell>{props.room.id}</TableCell>
      <TableCell>{props.room.roomName}</TableCell>
      <TableCell>{props.room.numberOfPlayers}</TableCell>
    </TableRow>
  );
}

export default Room;
