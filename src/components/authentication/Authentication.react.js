import React from 'react';
import {useContext, useState} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import SignInForm from 'components/authentication/SignInForm.react';
import SignUpForm from 'components/authentication/SignUpForm.react';

import * as ROUTES from 'constants/routes';

const useStyles = makeStyles({
  root: {
    background: '#6A62D2',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minWidth: 768,
  },
  content: {
    padding: '0 !important',
    display: 'flex',
  },
  panel: {
    flex: 1,
    padding: 24,
  },
  rightPanel: {
    background: '#C0E5C8',
  },
});

function Authentication() {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Card raised className={classes.card}>
        <CardContent className={classes.content}>
          <div className={classes.panel}>
            <SignInForm />
          </div>
          <div className={clsx(classes.panel, classes.rightPanel)}>
            <SignUpForm />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Authentication;
