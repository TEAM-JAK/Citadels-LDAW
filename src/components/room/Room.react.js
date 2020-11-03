import React from 'react';
import {TableCell, TableRow} from '@material-ui/core';

function Room(props) {
  return (
    <TableRow>
      <TableCell component="th" scope="row" style={{width: 160}}>
        {props.room.id}
      </TableCell>
      <TableCell style={{width: 160}}>{props.room.roomName}</TableCell>
      <TableCell style={{width: 100}}>{props.room.numberOfPlayers}</TableCell>
    </TableRow>
  );
}

export default Room;
