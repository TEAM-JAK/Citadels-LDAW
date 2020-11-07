import React from 'react';

function Board(props) {
  function ChooseCharacter() {
    props.moves.ChooseCharacter(0,1);
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
        payload = Math.floor(Math.random() * 8) + 1
        break;
      case 2:
        // payload: int character order number to steal
        payload = Math.floor(Math.random() * 8) + 1
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

  function EndStage() {
    props.moves.EndStage();
  }

  return (
    <div>
      <h1>"This is the board"</h1>
      <button onClick={ChooseCharacter}>ChooseCharacter</button>
      <button onClick={TakeCoin}>TakeCoin</button>
      <button onClick={TakeDistrictCard}>TakeDistrictCard</button>
      <button onClick={BuildDistrict}>BuildDistrict</button>
      <br></br>
      <button onClick={SkipOrEndStage}>SkipOrEndStage</button>
      <button onClick={UseCharacterPower}>UseCharacterPower</button>
      <button onClick={EndStage}>EndStage</button>
    </div> 
  );
}


export default Board;