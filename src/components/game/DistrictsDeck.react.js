import React from 'react';
import {Card} from '../bgioComponents/card';

function DistrictsDeck(props) {
  let cardsLeftOnDeck = [];
  for (let index = 0; index < props.deckOfDistricts.length; index++) {
    const element = array[index];
    cardsLeftOnDeck.push(
      <Card isReversed={true} cardValue={props.deckOfDistricts[index]} />,
    );
  }

  return <div></div>;
}

export default DistrictsDeck;
