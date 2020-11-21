import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox } from '@material-ui/core';
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

  // Rendering face down cards
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

  // Render face up cards
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

  // Reneder choosable cards
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
      <Dialog open={dialogOpen}
        onClose={handleClose}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        fullWidth={true}
        aria-labelledby="form-dialog-title">
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

function ShowPlayers({numPlayers, setPayload, currentPlayer}) {
  let players = []
  for (let index = 0; index < numPlayers; index++) {
    if (index == currentPlayer) {
      const image = <img src={""} alt={"Card-Face-Down"} />
      players.push(
        <Card
          back={image}
          isFaceUp={false}
          canHover={false}
          className='card'
          key={"Player "+index}
        />
      );
    } else {
      const image = <img src={""} alt={"Player "+index} />
      players.push(
        <Card
          front={image}
          isFaceUp={true}
          canHover={true}
          className='highlight'
          key= {"Player "+index}
          onClick={() => {setPayload({isOptionA: true, changeHandsWith: index, changeMyHandIndx: []});}}
        />
      );
    }
  }

  return(
    players
  );
}

function ShowHand({hand, setPayload}) {
  let handCards = [];
  const [selectedCards, setSelectedCards] = useState([]);

  const handleClick = (index) => {
    // TODO : highlight cards
    let containIndx = selectedCards.findIndex(element => element === index);
    if (containIndx !== -1) {
      setSelectedCards([...selectedCards.slice(0,containIndx), selectedCards.slice(0,containIndx)])
    } else {
      setSelectedCards([...selectedCards, index]);
    }

    setPayload({isOptionA: false, changeHandsWith: -1, changeMyHandIndx: selectedCards});
  }

  for (let index = 0; index < hand.length; index++) {
    const image = <img src={hand[index].front} alt={hand[index].name+"-Card-Front"} />
    handCards.push(
      <Card
        front={image}
        isFaceUp={true}
        canHover={true}
        className='highlight'
        key= {"Player "+index}
        onClick={() => handleClick(index)}
      />
    );
  }
  
  return(
    handCards
  );
}

function UseCharacterPowerDialog({characterNumber, murderedCharacter, numPlayers, hand, currentPlayer, UseCharacterPower}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [useCharacterBtn, setUseCharacterBtn] = useState(false);
  const uicontext = useContext(UIContext);
  const [payload, setPayload] = useState();
  const [checkBox, setCheckBox] = useState(false);

  const backSrc = "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fback_gray.jpg?alt=media&token=7a1f8e7e-4a08-426a-9edd-09e60e22496a";
  const deck = [
    {order: 1, name: "Assasin", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fasesino.jpg?alt=media&token=03ceea66-dbc1-435d-b46e-1c1edd48b141", back: backSrc},
    {order: 2, name: "Thief", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fladron.jpg?alt=media&token=dfd057fc-3073-40ce-9053-bad997173482", back: backSrc},
    {order: 3, name: "Magician", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fmago.jpg?alt=media&token=7ee85db5-3682-486d-820b-2225fce7aea5", back: backSrc},
    {order: 4, name: "King", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Frey.jpg?alt=media&token=60239d45-6c7c-424c-9b77-e2e10c38ad86", back: backSrc},
    {order: 5, name: "Bishop", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fobispo.jpg?alt=media&token=fda603aa-89c4-4692-b09a-e823940d2409", back: backSrc},
    {order: 6, name: "Merchant", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fmercader.jpg?alt=media&token=2705ddf3-cf31-47c5-9a79-56f462f43085", back: backSrc},
    {order: 7, name: "Architect", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Farquitecto.jpg?alt=media&token=ee9cee94-7064-4d4e-8f81-760e2df8c772", back: backSrc},
    {order: 8, name: "Warlord", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fguerrero.jpg?alt=media&token=f56f6050-9c7f-47df-93f6-3b8d157f4b89", back: backSrc},
  ]

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    // disable use character power btn
    setDialogOpen(false);
    setUseCharacterBtn(true);
    UseCharacterPower(payload);
  }

  const handleChange = (event) => {
    setCheckBox(event.target.checked);
  }

  let dialogContent = [];

  switch (characterNumber) {
    case 1:
      console.log("ENTEred");
        for (let index = 1; index < deck.length; index++) {
          const image = <img src={deck[index].front} alt={deck[index].name+"-Card-Front"} />
          dialogContent.push(
            <Card
              front={image}
              isFaceUp={true}
              canHover={true}
              className='highlight'
              key= {deck[index].name}
              onClick={() => setPayload(index)}
              context={uicontext}
            />
          );
        }
        break;
      case 2:
        for (let index = 2; index < deck.length; index++) {
          if (index === murderedCharacter) {
            const image = <img src={deck[index].back} alt={"Card-Face-Down"} />
            dialogContent.push(
              <Card
                back={image}
                isFaceUp={false}
                canHover={false}
                className='card'
                key={HashOfString(deck[index].name)}
                context={uicontext}
              />
            );
          } else {
            const image = <img src={deck[index].front} alt={deck[index].name+"-Card-Front"} />
            dialogContent.push(
              <Card
                front={image}
                isFaceUp={true}
                canHover={true}
                className='highlight'
                key= {deck[index].name}
                onClick={() => {setPayload(index);}}
                context={uicontext}
              />
            );
          } 
        }
        break;
      case 3:
        dialogContent.push(
          <div>
            <Checkbox
              checked={checkBox}
              onChange={handleChange}
              name="checkOption"
              color="primary"
            /> <p>Option A</p>
            { checkBox 
            ? <ShowPlayers numPlayers={numPlayers} setPayload={setPayload} currentPlayer={currentPlayer}></ShowPlayers>
            : <ShowHand hand={hand} setPayload={setPayload}></ShowHand>
            }
          </div>
        );
        //payload = {isOptionA: false, changeHandsWith: 4, changeMyHandIndx: [0,2]}
        break;
    }

  return (
    <div>
      { characterNumber > 3
        ? <div>
            <Button variant="outlined" color="primary" disabled={useCharacterBtn} onClick={ () => UseCharacterPower(-1)}>
              Use Character Power
            </Button>
          </div>
        : <div>
            <Button variant="outlined" color="primary" disabled={useCharacterBtn} onClick={handleClickOpen}>
              UseCharacterPower
            </Button>
            <Dialog open={dialogOpen}
              onClose={handleClose}
              fullWidth={true}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Use Power</DialogTitle>
              <DialogContent>
                {dialogContent}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Use Power
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
    </div>
  )
}

function TakeActionDialog({pileOfCoins, deckOfDistricts, setEndStageBtn, setBuildDistrictBtn, takeActionBtn, setTakeActionBtn,  TakeCoin, TakeDistrictCard}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const uicontext = useContext(UIContext);
  const [action, setAction] = useState("");

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setBuildDistrictBtn(false);
    setEndStageBtn(false);
    setTakeActionBtn(true);
    
    // TODO : ask alf enable build distric btn and enable endStageBtn
    // also about resets of states each turn
    if (action === "takeCoin") {
      TakeCoin();
    } else if (action === "takeDistrict0") {
      TakeDistrictCard(true);
    }else if (action === "takeDistrict1") {
      TakeDistrictCard(false);
    }
    
  }

  let takeActionOptions = []

  // Adding option for coins
  if (pileOfCoins>2) {
    if(pileOfCoins === 1) {
      const image = <img src={"https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fone_coin.jpg?alt=media&token=5c54886b-6975-440f-84d9-98f372045981"} alt={"One-Coin-Card"} />
      takeActionOptions.push(
        <Card
          front={image}
          isFaceUp={true}
          canHover={true}
          className='highlight'
          key= {"One-Coin"}
          onClick={() => {setAction("takeCoin")}}
          context={uicontext}
        />
      );
    } else {
      const image = <img src={"https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Ftwo_coin.jpg?alt=media&token=71911bbd-817d-44ec-9922-da8af74e91ee"} alt={"Two-Coin-Card"} />
      takeActionOptions.push(
        <Card
          front={image}
          isFaceUp={true}
          canHover={true}
          className='highlight'
          key= {"Two-Coins"}
          onClick={() => {setAction("takeCoin")}}
          context={uicontext}
        />
      );
    }
  }

  // Adding district card options
  if (deckOfDistricts.length > 2) {
    if(deckOfDistricts.length !== 1) {
      const image = <img src={deckOfDistricts[1].front} alt={deckOfDistricts[1].name+"-Card-Front"} />
      takeActionOptions.push(
        <Card
          front={image}
          isFaceUp={true}
          canHover={true}
          className='highlight'
          key= {deckOfDistricts[1].name}
          onClick={() => {setAction("takeDistrict1")}}
          context={uicontext}
        />
      );
    }
    const image = <img src={deckOfDistricts[0].front} alt={deckOfDistricts[0].name+"-Card-Front"} />
    takeActionOptions.push(
      <Card
        front={image}
        isFaceUp={true}
        canHover={true}
        className='highlight'
        key= {deckOfDistricts[0].name}
        onClick={() => {setAction("takeDistrict0")}}
        context={uicontext}
      />
    );
  }

  return (
    <div>
      <Button variant="outlined" color="primary" disabled={takeActionBtn} onClick={handleClickOpen}>
        Take Action
      </Button>
      <Dialog open={dialogOpen}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose which action</DialogTitle>
        <DialogContent>
          {takeActionOptions}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Action
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function BuildDistricDialog({hand, coins, buildDistrictBtn, setBuildDistrictBtn, BuildDistrict}) {
  
  const [districtToBuild, setDistrictToBuild] = useState(-1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const uicontext = useContext(UIContext);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClick = (index, cost, coins) => {
    // TODO: Highlight current card and not others
    if(cost <= coins) {
      setDistrictToBuild(index);
    } else {
      console.log("Can not use because it is expensive. show alert.")
    }
  }

  const handleClose = () => {
    
    setDialogOpen(false);
    BuildDistrict(districtToBuild);
  }

  let buildOptions = []

  for (let index = 0; index < hand.length; index++) {
    const image = <img src={hand[index].front} alt={hand[index].name+"-Card-Front"} />
    buildOptions.push(
      <Card
        front={image}
        isFaceUp={true}
        canHover={true}
        className='highlight'
        key= {hand[index].name+"-Card-Front"}
        onClick={() => handleClick(index, hand[index].cost, coins)}
        context={uicontext}
      />
    );
  }

  return (
    <div>
      <Button variant="outlined" color="primary" disabled={buildDistrictBtn} onClick={() => handleClickOpen}>
        Build Distric
      </Button>
      <Dialog open={dialogOpen}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Build District</DialogTitle>
        <DialogContent>
          {buildOptions}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Build
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function DestroyDistricDialog({hands, bishopPlayerID, coins, WarlordPower, EndTurn}) {
  const [destroyBtn, setDestroyBtn] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const uicontext = useContext(UIContext);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {

    setDestroyBtn(true);
    setDialogOpen(false);
    WarlordPower({ player: 0, builtCityHandIndx: 0});
    EndTurn();
  }

  let DistroyOptions = []

  
  
  return (
    <div>
      <Button variant="outlined" color="primary" disabled={destroyBtn} onClick={handleClickOpen}>
        Destroy
      </Button>
      <Dialog open={dialogOpen}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Destroy Distric</DialogTitle>
        <DialogContent>
          {DistroyOptions}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Destroy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export { ChooseCharacterDialog, UseCharacterPowerDialog, TakeActionDialog, BuildDistricDialog, DestroyDistricDialog };