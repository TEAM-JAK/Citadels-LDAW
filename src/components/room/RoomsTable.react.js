import React, {useContext, useState, useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Room from './RoomRow.react';
import {Box, TablePagination} from '@material-ui/core';

function RoomsTable() {
  const firebase = useContext(FirebaseContext);
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = React.useState(0);

  const getRooms = () => {
    const availabeRooms = firebase.fetchAvailableRooms();
    setRooms(availabeRooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{marginLeft: '20px'}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{width: 160}}>
                <Box fontWeight="fontWeightBold">Room ID</Box>
              </TableCell>
              <TableCell style={{width: 160}}>
                <Box fontWeight="fontWeightBold">Room name</Box>
              </TableCell>
              <TableCell style={{width: 100}}>
                <Box fontWeight="fontWeightBold">Num. Players</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.slice(page * 5, page * 5 + 5).map((room, index) => {
              return <Room key={index} room={room} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPage={5}
        rowsPerPageOptions={[5]}
        count={rooms.length}
        page={page}
        onChangePage={handleChangePage}
      />
    </div>
  );
}

export default RoomsTable;
