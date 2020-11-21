import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    padding: 16,
    backgroundColor: '#fffffd',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: '#f2f2f2',
  },
  details: {
    marginRight: 24,
    width: 256,
  },
});

export default function RoomsListItem({room, onJoin}) {
  const classes = useStyles();
  return (
    <FlexLayout align="center" className={classes.root}>
      <FlexLayout direction="vertical" className={classes.details}>
        <Typography gutterBottom>{`ID: ${room.matchID}`}</Typography>
        <Typography>{`Name: ${room.setupData.roomName}`}</Typography>
      </FlexLayout>
      <Button variant="contained" color="primary" onClick={() => onJoin(room.matchID)}>
        Join
      </Button>
    </FlexLayout>
  );
}
