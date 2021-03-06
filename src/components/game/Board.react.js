import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {IsMyTurn, FindPlayerWithCharacter, GetCurrentSituation} from './Utiliy';
import {
  ChooseCharacterDialog,
  UseCharacterPowerDialog,
  TakeActionDialog,
  BuildDistricDialog,
  DestroyDistricDialog,
} from './Dialogs.react';
import PlayerCard from './PlayerCard.react';
import {Card} from '../bgioComponents/card';
import {BiDollarCircle} from 'react-icons/bi';

function PlayPhaseUI({props}) {
  const [endStageBtn, setEndStageBtn] = useState(true);
  const [buildDistrictBtn, setBuildDistrictBtn] = useState(true);
  const [destroyBtn, setDestroyBtn] = useState(true);
  const [takeActionBtn, setTakeActionBtn] = useState(false);
  const [useCharacterBtn, setUseCharacterBtn] = useState(false);
  let devCharacterNumber = -1;

  // if playphase:
  //  render use character power which renders dialog depending on power for intput and get payload
  //  render takeaction btn which shows dialiog to take coin or district and after choosing enable build distric btn and enable end or skip btn and if warlord enable destroy btn
  //  render build distric btn disabled which shows dialog for building district
  //  render skip or end stage btn disabled
  //  if warlord enable destroy btn disabled disolay dialog for warlord.
  return (
    <div>
      <UseCharacterPowerDialog
        //characterNumber={devCharacterNumber}
        characterNumber={
          props.G.players[props.ctx.currentPlayer].chosenCharacter[0].order
        }
        murderedCharacter={props.G.murderedCharacter}
        numPlayers={props.ctx.numPlayers}
        currentPlayer={props.ctx.currentPlayer}
        hand={props.G.secret[props.ctx.currentPlayer].hand}
        useCharacterBtn={useCharacterBtn}
        setUseCharacterBtn={setUseCharacterBtn}
        UseCharacterPower={props.moves.UseCharacterPower}
      ></UseCharacterPowerDialog>
      <br></br>
      <TakeActionDialog
        pileOfCoins={props.G.pileOfCoins}
        deckOfDistricts={props.G.deckOfDistricts}
        setEndStageBtn={setEndStageBtn}
        setBuildDistrictBtn={setBuildDistrictBtn}
        takeActionBtn={takeActionBtn}
        setTakeActionBtn={setTakeActionBtn}
        TakeCoin={props.moves.TakeCoin}
        TakeDistrictCard={props.moves.TakeDistrictCard}
      ></TakeActionDialog>
      <br></br>
      <BuildDistricDialog
        props={props}
        hand={props.G.secret[props.ctx.currentPlayer].hand}
        coins={props.G.players[props.ctx.currentPlayer].coins}
        buildDistrictBtn={buildDistrictBtn}
        setBuildDistrictBtn={setBuildDistrictBtn}
        BuildDistrict={props.moves.BuildDistrict}
        setDestroyBtn={setDestroyBtn}
      ></BuildDistricDialog>
      <br></br>
      {props.G.players[props.ctx.currentPlayer].chosenCharacter[0].order === 8 ? (
        <DestroyDistricDialog
          hands={props.G.secret}
          bishopPlayerID={FindPlayerWithCharacter(
            props.G,
            props.ctx.numPlayers,
            5,
          )}
          coins={props.G.players[props.ctx.currentPlayer].coins}
          WarlordPower={props.moves.WarlordPower}
          EndTurn={props.moves.EndTurn}
          setEndStageBtn={setEndStageBtn}
          setBuildDistrictBtn={setBuildDistrictBtn}
          setTakeActionBtn={setTakeActionBtn}
          setUseCharacterBtn={setUseCharacterBtn}
          destroyBtn={destroyBtn}
          setDestroyBtn={setDestroyBtn}
        ></DestroyDistricDialog>
      ) : (
        <div></div>
      )}
      <br></br>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          props.moves.SkipOrEndStage();
          setEndStageBtn(true);
          setBuildDistrictBtn(true);
          setTakeActionBtn(false);
          setUseCharacterBtn(false);
          setDestroyBtn(false);
        }}
        disabled={endStageBtn}
      >
        End Turn
      </Button>
    </div>
  );
}


function DisplayAlways({props}) {
  console.log("LIne 109", props);
  let playerCardInfo = [];
  for (let index = 0; index < Object.keys(props.G.players).length; index++) {
    if (props.playerID != index) {
      playerCardInfo.push(
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
        src={props.G.secret[props.playerID].hand[index].front}
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

  let builtCities = [];
  for (let index = 0; index < props.G.players[props.playerID].builtCity.length; index++) {
    console.log('Carta ' + index);
    const image = (
      <img
        src={props.G.players[props.playerID].builtCity[index].front}
        alt={props.G.players[props.playerID].builtCity[index].name + '-Card-Front'}
        width="100px"
        height="140px"
      />
    );
    builtCities.push(
      <Card
        isFaceUp={true}
        front={image}
        canHover={true}
        className="highlight"
        key={index}
      />,
    );
  }

  let situation = GetCurrentSituation(props.G, props.ctx);
  // returns what is happening.
  let situationReneder = []
  situationReneder.push(
    <div>
      <h1>We are on: {situation.phase} phase</h1>
      <h1>{situation.activePlayer} is playing now</h1>
    </div>
  )

  return(
    <div>
      {situationReneder}
      <div style={{display: 'flex'}}>
        <div style={{flex: '0 0 20%'}}>{playerCardInfo}</div>
      </div>
      <div
        style={{
          width: '600px',
          display: 'flex',
          position: 'fixed',
          left: '50%',
          bottom: '200px',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgb(218, 220, 224, 0.8)',
        }}
      >
        {builtCities}
        <div>
          <BiDollarCircle /> {props.G.players[props.playerID].coins}
        </div>
      </div>
      <div
        style={{
          width: '600px',
          display: 'flex',
          position: 'fixed',
          left: '50%',
          bottom: '50px',
          transform: 'translateX(-50%)'
        }}
      >
        {districtsInMyHand}
      </div>
    </div>
  );
}

function Board(props) {
  console.log("Props:123:Board", props);
  let conditionalRender = [];

  if (IsMyTurn(props.ctx.currentPlayer, props.playerID)) {
    if (props.ctx.phase === 'drawPhase') {
      conditionalRender.push(
        <ChooseCharacterDialog
          deckOfCharacters={props.G.deckOfCharacters}
          faceDownCharacterCards={props.G.faceDownCharacterCards}
          faceUpCharacterCards={props.G.faceUpCharacterCards}
          ChooseCharacter={props.moves.ChooseCharacter}
        />
      )
    } else if (props.ctx.phase === 'playPhase') {
      conditionalRender.push(
        <PlayPhaseUI props={props} />
      )
    }
  }

  if (props.ctx.gameover) {
    console.log(props.ctx.gameover);
    return <h1>GAME IS OVER WINNERS:...</h1>;
  }

  return (
    <div>
      {conditionalRender}
      <DisplayAlways props={props}/>
    </div>
  );
}

export default Board;
