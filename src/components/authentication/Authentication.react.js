import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import SignInForm from 'components/authentication/SignInForm.react';
import SignUpForm from 'components/authentication/SignUpForm.react';

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
      <Paper className={classes.card}>
        <div className={classes.panel}>
          <SignInForm />
        </div>
        <div className={clsx(classes.panel, classes.rightPanel)}>
          <SignUpForm />
        </div>
      </Paper>
    </main>
  );
}

export default Authentication;
