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
  },
});

function PlayerCard(props) {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{margin: '12px 0', backgroundColor: '#7504D1'}}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.username}
        </Typography>
        <Typography component="h2">{props.character}</Typography>
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
          <Tooltip title={props.citiesBuilt} placement="center">
            <Typography>
              <FaCity /> Cities
            </Typography>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
