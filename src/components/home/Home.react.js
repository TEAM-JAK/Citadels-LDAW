import React from 'react';
import {useContext, useState, useEffect} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';

import FormDialogButton from 'components/formDialogButton/FormDialogButton.react';
import RoomsTable from 'components/room/RoomsTable.react';
import GeneralChat from 'components/generalChat/GeneralChat.react';

import useSocketSubscription from 'hooks/useSocketSubscription';
import useSocketClient from 'hooks/useSocketClient';
import {Paper, Typography} from '@material-ui/core';

function Home() {
  const containerStyle = {
    width: '1000px',
    height: '500px',
    backgroundColor: 'rgb(238, 238, 238)',
    padding: '25px',
    position: 'relative',
  };

  const upperRowStyle = {
    display: 'flex',
    margin: '20px 0',
  };

  const lowerRowStyle = {
    display: 'flex',
    margin: '20px 0',
  };

function Home() {
  return <div>hello</div>;
}

export default Home;
