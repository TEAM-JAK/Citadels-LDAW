import React from 'react';
import cardFront from 'assets/cards/cardfront.png';
import cardBack from 'assets/cards/cardback.png';

function Card(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
      }}
    >
      {props.isReversed ? (
        <img src={cardFront} alt="Card Front" width="100" height="180" />
      ) : (
        <img src={cardBack} alt="Card Back" width="100" height="180" />
      )}
    </div>
  );
}

export default Card;
