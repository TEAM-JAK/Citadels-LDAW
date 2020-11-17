import React from 'react';
import {useContext, useState, useEffect} from 'react';
import FirebaseContext from 'components/firebase/FirebaseContext.react';

import Cards from 'components/game/Cards.react';
import Chat from 'components/chat/Chat.react';

import useSocketSubscription from 'hooks/useSocketSubscription';

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function Board(props) {
  const firebase = useContext(FirebaseContext);

  function ChooseCharacter() {
    props.moves.ChooseCharacter(0, 1);
  }

  function TakeCoin() {
    props.moves.TakeCoin();
  }

  function TakeDistrictCard() {
    props.moves.TakeDistrictCard(true);
  }

  function BuildDistrict() {
    props.moves.BuildDistrict(0);
  }

  function SkipOrEndStage() {
    props.moves.SkipOrEndStage();
  }

  function UseCharacterPower() {
    let payload;
    switch (props.G.players[props.ctx.currentPlayer].chosenCharacter[0].order) {
      case 1:
        // payload: int character order number to murder
        payload = Math.floor(Math.random() * 8) + 1;
        break;
      case 2:
        // payload: int character order number to steal
        payload = Math.floor(Math.random() * 8) + 1;
        break;
      case 3:
        // payload: {isOptionA: true, changeHandsWith: int, changeMyHandIndx: [int]}
        payload = {isOptionA: false, changeHandsWith: 4, changeMyHandIndx: [0, 2]};
        break;
      case 4:
        payload = -1;
        break;
      case 5:
        payload = -1;
        break;
      case 6:
        payload = -1;
        break;
      case 7:
        // No use power, just explanaition
        break;
      case 8:
        payload = -1;
        break;
      default:
        break;
    }
    props.moves.UseCharacterPower(payload);
  }

  function EndStage() {
    props.moves.EndStage();
  }

  const [errors, data] = useSocketSubscription(['TEST']);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data != null) {
      setMessages([...messages, data]);
    }
  }, [data, setMessages]);

  useEffect(() => {
    async function fetchUserData() {
      // const userData = await firebase.doGetUserProfile();
      // setUserData(userData);
    }
    fetchUserData();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{height: '94vh', display: 'flex'}}>
        <div style={{width: '70vw', float: 'left'}}>
          <h1>"This is the board"</h1>
          <button onClick={ChooseCharacter}>ChooseCharacter</button>
          <button onClick={TakeCoin}>TakeCoin</button>
          <button onClick={TakeDistrictCard}>TakeDistrictCard</button>
          <button onClick={BuildDistrict}>BuildDistrict</button>
          <br></br>
          <button onClick={SkipOrEndStage}>SkipOrEndStage</button>
          <button onClick={UseCharacterPower}>UseCharacterPower</button>
          <button onClick={EndStage}>EndStage</button>
          <Cards numberOfCards={5}></Cards>
        </div>
        <div style={{width: '300px'}}>
          <Chat username={userData ? userData.username : ''} fullHeight={true} />
        </div>
      </div>
    </DndProvider>
  );
}

export default Board;
