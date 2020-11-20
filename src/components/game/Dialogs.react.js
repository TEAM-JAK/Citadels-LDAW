import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Card } from '../bgioComponents/card';
import UIContext from '../bgioComponents/ui-context';
import { HashOfString } from './Utiliy';

function ChooseCharacterDialog({deckOfCharacters,faceDownCharacterCards,faceUpCharacterCards, ChooseCharacter}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  // TODO : implement for two players in which you choose two.
  const [chosenCharacter, setChosenCharacter] = useState({
    value1: -1,
    value2: -1,
  });
  const uicontext = useContext(UIContext);
  
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    ChooseCharacter(chosenCharacter.value1, chosenCharacter.value2);
  }

  let cardsToChoose = [];

  faceDownCharacterCards.forEach(cardElement => {
    const image = <img src={cardElement.back} alt="Card-Face-Down" />
    cardsToChoose.push(
      <Card
        back={image}
        isFaceUp={false}
        canHover={false}
        className='card'
        key={HashOfString(cardElement.name)}
        context={uicontext}
      />
    );
  });
  cardsToChoose.push(<br></br>);

  faceUpCharacterCards.forEach(cardElement => {
    let keyIndx = 0;
    const image = <img src={cardElement.front} alt={cardElement.name+"-Card-Front"} />
    cardsToChoose.push(
      <Card
        front={image}
        isFaceUp={true}
        canHover={false}
        className='card'
        key={cardElement.name}
        context={uicontext}
      />
    );
    keyIndx=keyIndx+1;
  });
  cardsToChoose.push(<br></br>);

  for (let index = 0; index < deckOfCharacters.length; index++) {
    const image = <img src={deckOfCharacters[index].front} alt={deckOfCharacters[index].name+"-Card-Front"} />
    cardsToChoose.push(
      <Card
        front={image}
        isFaceUp={true}
        canHover={true}
        className='highlight'
        key= {deckOfCharacters[index].name}
        onClick={() => {setChosenCharacter({value1: index, value2: -1});console.log({index})}}
        context={uicontext}
      />
    );
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Choose Character
      </Button>
      <Dialog open={dialogOpen} onClose={handleClose} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose Character</DialogTitle>
        <DialogContent>
          {cardsToChoose}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Choose
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export { ChooseCharacterDialog };