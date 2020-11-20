import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { IsMyTurn } from './Utiliy';
import { ChooseCharacterDialog } from './Dialogs.react';

function PlayPhaseUI() {
  const [buildDistrictBtn, setBuildDistrictBtn] = useState(true);
  const [endStageBtn, setEndStageBtn] = useState(true);
  // if playphase:
  //  render use character power which renders dialog depending on power for intput and get payload
  //  render takeaction btn which shows dialiog to take coin or district and after choosing enable build distric btn and enable end or skip btn and if warlord enable destroy btn
  //  render build distric btn disabled which shows dialog for building district
  //  render skip or end stage btn disabled
  //  if warlord enable destroy btn disabled disolay dialog for warlord.
  return(
    <div>
      <Button variant="contained" color="primary">
        UseCharacterPower
      </Button>
      <Button variant="contained" color="primary">
        Take Action
      </Button>
      <Button variant="contained" color="primary" disabled={buildDistrictBtn}>
        Build Distric
      </Button>
      <Button variant="contained" color="primary" disabled={endStageBtn}>
        EndStage
      </Button>
    </div>
  );
}

function OtherPlayerTurn() {
  // returns what is happening.
  return(
    <div>
      <h1>something happening to other player</h1>
      <h1>TO IMPLEMENT</h1>
    </div>
  );
}


function Board(props) {
  let devTurn = "myTurn"
  let devPhase = "playPhase" //"playPhase"

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
        payload = 5//Math.floor(Math.random() * 8) + 1
        break;
      case 2:
        // payload: int character order number to steal
        payload = 3//Math.floor(Math.random() * 8) + 1
        break;
      case 3:
        // payload: {isOptionA: true, changeHandsWith: int, changeMyHandIndx: [int]}
        payload = {isOptionA: false, changeHandsWith: 4, changeMyHandIndx: [0,2]}
        break;
      case 4:
        payload = -1
        break;
      case 5:
        payload = -1
        break;
      case 6:
        payload = -1
        break;
      case 7:
        // No use power, just explanaition
        break;
      case 8:
        payload = -1
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
    let destroy = { player: 0, builtCityHandIndx: 0}
    props.moves.WarlordPower(destroy);
  }

  console.log(props)

  if(IsMyTurn(props.ctx.currentPlayer, props.ctx.playerID) || devTurn === "myTurn") {
    if (props.ctx.phase === "drawPhase" || devPhase === "drawPhase") {
      return (
        <div>
          {/* TODO: if two players choose two */}
          <ChooseCharacterDialog
            deckOfCharacters={props.G.deckOfCharacters}
            faceDownCharacterCards={props.G.faceDownCharacterCards}
            faceUpCharacterCards={props.G.faceUpCharacterCards}
            ChooseCharacter={props.moves.ChooseCharacter}>
          </ChooseCharacterDialog>
        </div>
      );
    } else if (props.ctx.phase === "playPhase" || devPhase === "playPhase") {
      return(
        <PlayPhaseUI></PlayPhaseUI>
      );
    }
  }
  return (
      <OtherPlayerTurn></OtherPlayerTurn>
  );
}


export default Board;