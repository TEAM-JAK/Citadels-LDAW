import React from 'react';
import PlayerCard from './PlayerCard.react';
import {Card} from '../bgioComponents/card';

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
  for (let index = 0; index < Object.keys(props.G.players).length; index++) {
    if (props.playerID != index) {
      playerCards.push(
        <PlayerCard
          key={index}
          username={`Jugador ${index}`}
          character={
            props.ctx.currentPlayer == index
              ? props.G.players[index].chosenCharacter
              : Array(0)
          }
          coins={props.G.players[index].coins}
          cardsInHand={props.G.players[index].handCount}
          citiesBuilt={props.G.players[index].builtCity}
        />,
      );
    }
  }

  let districtsInMyHand = [];
  for (let index = 0; index < props.G.secret[props.playerID].hand.length; index++) {
    console.log('Carta ' + index);
    const image = (
      <img
        src={props.G.secret[props.playerID].hand[index].imageURL}
        alt={props.G.secret[props.playerID].hand[index].name + '-Card-Front'}
        width="100px"
        height="140px"
      />
    );
    districtsInMyHand.push(
      <Card
        isFaceUp={true}
        front={image}
        canHover={true}
        className="highlight"
        key={index}
      />,
    );
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div
          style={{
            width: '600px',
            display: 'flex',
            position: 'fixed',
            left: '50%',
            bottom: '50px',
            transform: 'translateX(-50%)',
          }}
        >
          {districtsInMyHand}
        </div>
      </div>
    </div>
  );
}

export default Board;
