import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {BiDollarCircle} from 'react-icons/bi';
import {FaCity} from 'react-icons/fa';
import {GiCardBurn} from 'react-icons/gi';
import {Tooltip} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 275,
    padding: 8,
    '&:last-child': {
      paddingBottom: '8 !important',
    },
  },
});

function PlayerCard(props) {
  const classes = useStyles();

  console.log('Player Card');
  console.log(props);

  let citiesBuilt = [];
  for (let index = 0; index < props.citiesBuilt.length; index++) {
    citiesBuilt.push(props.citiesBuilt[index].name);
  }

  return (
    <Card
      className={classes.root}
      style={{margin: '6px 0 6px 1px', backgroundColor: 'rgba(62, 0, 238, 0.6)'}}
    >
      <Typography variant="subtitle1">{props.username}</Typography>
      <Typography variant="subtitle1">
        {props.character.length !== 0 ? props.character[0].name : '???'}
      </Typography>
      <div
        style={{
          flex: '0 0 20%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Typography>
          <BiDollarCircle /> {props.coins}
        </Typography>
        <Typography>
          <GiCardBurn /> {props.cardsInHand}
        </Typography>
        <Tooltip title={citiesBuilt.length != 0 ? citiesBuilt : ''} placement="center">
          <Typography>
            <FaCity /> {props.citiesBuilt.length}
          </Typography>
        </Tooltip>
      </div>
    </Card>
  );
}

export default PlayerCard;
