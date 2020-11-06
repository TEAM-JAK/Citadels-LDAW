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
    props.moves.UseCharacterPower(3);
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
    </div> 
  );
}


export default Board;