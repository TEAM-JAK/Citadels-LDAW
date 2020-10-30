import React, {useContext, useState, useEffect} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Room from './Room.react';

function RoomsTable() {
  const firebase = useContext(FirebaseContext);
  const [rooms, setRooms] = useState([]);

  const getRooms = () => {
    const availabeRooms = firebase.doGetAvailableRooms();
    setRooms(availabeRooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Room ID</TableCell>
          <TableCell>Room name</TableCell>
          <TableCell>Num. Players</TableCell>
        </TableRow>
        {rooms.map((room) => {
          return <Room room={room} />;
        })}
      </TableHead>
    </Table>
  );
}

export default RoomsTable;
