import React from 'react';
import PlayerCard from './PlayerCard.react';

function Board(props) {
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
        payload = 5; //Math.floor(Math.random() * 8) + 1
        break;
      case 2:
        // payload: int character order number to steal
        payload = 3; //Math.floor(Math.random() * 8) + 1
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

  function EndTurn() {
    props.moves.EndTurn();
  }

  function WarlordPower() {
    let destroy = {player: 0, builtCityHandIndx: 0};
    props.moves.WarlordPower(destroy);
  }

  console.log(props);

  let playerCards = [];
  for (let index = 0; index < 4; index++) {
    if (props.ctx.currentPlayer !== index) {
      // playerCards.push(
      //   <PlayerCard
      //     key={index}
      //     username={props.players.length}
      //     character={props.players[index].name}
      //     coins={props.players[index].chosenCharacter}
      //     cardsInHand={props.players[index].handCount}
      //     citiesBuilt={props.players[index].districtBuiltOnTurn}
      //   />,
      // );
      playerCards.push(
        <PlayerCard
          key={index}
          username={'owo'}
          character={'Rey'}
          coins={155}
          cardsInHand={4}
          citiesBuilt={2}
        />,
      );
    }
  }

  return (
    <div style={{display: 'flex'}}>
      <div style={{flex: '0 0 20%'}}>{playerCards}</div>
      <div>
        <button onClick={ChooseCharacter}>ChooseCharacter</button>
        <br></br>
        <button onClick={TakeCoin}>TakeCoin</button>
        <button onClick={TakeDistrictCard}>TakeDistrictCard</button>
        <br></br>
        <button onClick={BuildDistrict}>BuildDistrict</button>
        <button onClick={SkipOrEndStage}>SkipOrEndStage</button>
        <br></br>
        <button onClick={UseCharacterPower}>UseCharacterPower</button>
        <br></br>
        <button onClick={WarlordPower}>UseWarlordPower</button>
        <button onClick={EndTurn}>EndTurn</button>
      </div>
    </div>
  );
}

export default Board;
