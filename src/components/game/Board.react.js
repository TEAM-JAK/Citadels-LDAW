import React from 'react';

function Board(props) {
  function ChooseCharacter() {
    props.moves.ChooseCharacter();
  }

  function TakeCoin() {
    props.moves.TakeCoin();
  }

  function TakeDistrictCard() {
    props.moves.TakeDistrictCard();
  }

  function BuildDistrict() {
    props.moves.BuildDistrict(0);
  }

  return (
    <div>
      <h1>"This is the board"</h1>
      <button onClick={ChooseCharacter}>ChooseCharacter</button>
      <button onClick={TakeCoin}>TakeCoin</button>
      <button onClick={TakeDistrictCard}>TakeDistrictCard</button>
      <button onClick={BuildDistrict}>BuildDistrict</button>
    </div> 
  );
}


export default Board;