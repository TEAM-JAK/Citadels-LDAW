import { INVALID_MOVE } from 'boardgame.io/core';
// might want to structure later for modes of game TODO
const gameMode = {
  NUMCHARACTERS : 8,
  MINPLAYERS: 2,
  MAXPLAYERS: 7,
}
/**
 * Function that allows user to choose a character.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {int} indx1 - index of deckOfCharacters that the user chose
 * @param {int} [indx2=-1] - index of deckOfCharacters to place facedown, only used when 2P grame
 */
export function ChooseCharacter(G, ctx, indx1, indx2 = -1) {
  console.log("Entered ChooseCharacter with: ", indx1)
  G.players[ctx.currentPlayer].chosenCharacter.splice(0,0,G.deckOfCharacters.splice(indx1,1)[0])

  // if 2 players after chose place another card facedown so when 2 players two choses.
  // First time it doesn't facedown (this is when deck of characters length === 6) 
  if (ctx.numPlayers === 2 && G.deckOfCharacters.length !== 6) {
    if (indx1 < indx2) {
      indx2 = indx2 - 1;
    }
    G.faceDownCharacterCards.push(G.deckOfCharacters.splice(indx2,1)[0])
  }

  // When playing with 7 players, when player 6 chooses move facedown to deck of characters
  // so player 7 has two choices.
  if (ctx.numPlayers === 7  && G.deckOfCharacters.length === 1 && ctx.playOrderPos === 5) {
    G.deckOfCharacters.push(G.faceDownCharacterCards.pop())
  }

  // let the deck be empty for phase is over function
  if(G.deckOfCharacters.length === 1) {
    G.faceDownCharacterCards.push(G.deckOfCharacters.pop());
  }
}

/**
 * Utility function to get current character from player. This works given that choosen characters are sorted in setPlayPhase() and after each turn the character is returned to deck of characters.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
export function getCurrentCharacter(G, ctx) {
  console.log("called getCurrentChar with:" + ctx.currentPlayer)
  let currentCharater = -1;
  currentCharater = G.players[ctx.currentPlayer].chosenCharacter[0].order;
  return currentCharater
}

export function findPlayerWithCharacter(G, ctx, characterOrder) {
  for (let i = 0; i < ctx.numPlayers; i++) {
    if (G.players[i].chosenCharacter.some(e => e.order === characterOrder)){
      return i
    }    
  }
  return -1;
}

/**
 * Function to take a coin in their turn.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
export function TakeCoin(G, ctx) {
  console.log("TakeCoin called")
  // Check if G.pileOfCoins has more thatn 2 coins.
  
  // If it is merchant(6) give one coin extra
  if(getCurrentCharacter(G, ctx) === 6 && G.pileOfCoins > 1) {
    G.players[ctx.currentPlayer].coins = G.players[ctx.currentPlayer].coins + 1;
    G.pileOfCoins = G.pileOfCoins - 1;
  }

  if (G.pileOfCoins === 1) {
    G.players[ctx.currentPlayer].coins = G.players[ctx.currentPlayer].coins + 1;
    G.pileOfCoins = G.pileOfCoins - 1;
  } else {
    G.players[ctx.currentPlayer].coins = G.players[ctx.currentPlayer].coins + 2;
    G.pileOfCoins = G.pileOfCoins - 2;
  }

  // If architect draw 2 district cards and add to hand
  if(getCurrentCharacter(G, ctx) === 7 && G.deckOfCharacters.length > 2) {
    let addCards = G.deckOfDistricts.splice(0,2)
    G.secret[ctx.currentPlayer].hand.push(addCards[0]);
    G.secret[ctx.currentPlayer].hand.push(addCards[1]);
    // G.secret[ctx.currentPlayer].hand.push(G.deckOfDistricts.shift());
    // G.secret[ctx.currentPlayer].hand.push(G.deckOfDistricts.shift());
  }
  
  ctx.events.endStage();
}

/**
 * Takes top 2 district cards and allows user to choose between them
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {bool} choseFirstCard - Either chose first card or second
 */
export function TakeDistrictCard(G, ctx, choseFirstCard) {
  console.log("TakeDistrictCard called")
  let first = G.deckOfDistricts.shift()
  let second = G.deckOfDistricts.shift()
  
  if(choseFirstCard){
    G.secret[ctx.currentPlayer].hand.push(first)
    G.deckOfDistricts.push(second)
  } else {
    G.secret[ctx.currentPlayer].hand.push(second)
    G.deckOfDistricts.push(first)
  }

  // If it is merchant(6) give one coin extra
  if(getCurrentCharacter(G, ctx) === 6 && G.pileOfCoins > 1) {
    G.players[ctx.currentPlayer].coins = G.players[ctx.currentPlayer].coins + 1;
    G.pileOfCoins = G.pileOfCoins - 1;
  }

  // If architect draw 2 district cards and add to hand
  if(getCurrentCharacter(G, ctx) === 7 && G.deckOfCharacters.length > 2) {
    G.secret[ctx.currentPlayer].hand.push(G.deckOfDistricts.shift());
    G.secret[ctx.currentPlayer].hand.push(G.deckOfDistricts.shift());
  }

  ctx.events.endStage();
}

/**
 * Utility function check weather the player still can build.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
function canBuild(G, ctx) {
  let canBuild = false;
  if(G.players[ctx.currentPlayer].districtBuiltOnTurn === 0 || (G.players[ctx.currentPlayer].districtBuiltOnTurn < 3 && getCurrentCharacter(G, ctx) === 7)){
    canBuild = true;
  }
  return canBuild;
}

/**
 * Function to call when building a district card.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {int} handIndex - index of card that is built
 */
export function BuildDistrict(G, ctx, handIndex) {
  console.log("Entered BuildDistrict")
  //Do not allow if it has more than 1, unles is architect.
  if(canBuild(G, ctx)) {
    G.players[ctx.currentPlayer].districtBuiltOnTurn = G.players[ctx.currentPlayer].districtBuiltOnTurn + 1;
    // Check if user has sufficient coins, should be checked before allowing to select that hand.
    if(G.players[ctx.currentPlayer].coins >= G.secret[ctx.currentPlayer].hand[handIndex].cost) {
      G.players[ctx.currentPlayer].coins = G.players[ctx.currentPlayer].coins - G.secret[ctx.currentPlayer].hand[handIndex].cost;
      G.pileOfCoins = G.pileOfCoins + G.secret[ctx.currentPlayer].hand[handIndex].cost;
      G.players[ctx.currentPlayer].builtCity.push(G.secret[ctx.currentPlayer].hand.splice(handIndex,1)[0])
    }
  }
  // if Warlord(8) setStage('extraStage')
  if(getCurrentCharacter(G, ctx) === 8) {
    ctx.events.setStage('extraStage');
  }
}

/**
 * Function to call to end or skip your turn, it returns to deck of characters your choosen card
 * and reset's powerUsed.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
export function SkipOrEndStage(G, ctx) {
  G.players[ctx.currentPlayer].powerUsed = false;
  G.players[ctx.currentPlayer].districtBuiltOnTurn = 0;

  // if Warlord(8) setStage('extraStage')
  if(getCurrentCharacter(G, ctx) === 8) {
    ctx.events.setStage('extraStage');
  } else {
    // move user lowest character to characterdeck
    G.deckOfCharacters.push(G.players[ctx.currentPlayer].chosenCharacter.splice(0,1)[0]);
    ctx.events.endStage();
    ctx.events.endTurn();
  }
}

/**
 * Function to call to end your turn in warloard, it returns to deck of characters your choosen card
 * and reset's powerUsed.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
export function EndTurn(G, ctx) {
  G.players[ctx.currentPlayer].powerUsed = false;
  G.players[ctx.currentPlayer].districtBuiltOnTurn = 0;

  // move user lowest character to characterdeck
  G.deckOfCharacters.push(G.players[ctx.currentPlayer].chosenCharacter.splice(0,1)[0]);
  ctx.events.endStage();
  ctx.events.endTurn(); 
}

/**
 * Changes G state to establish who to kill this turn. Effect is taken in BeginPlayTurn()
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {int} toMurder - character number to murder.
 */
function assasinPower(G, ctx, toMurder) { 
  G.murderedCharacter = toMurder;
}

/**
 * Changes G state to establish who to mugg this turn. Effect is taken in BeginPlayTurn()
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {int} toSteal - character number to still from
 */
function thiefPower(G, ctx, toSteal) {
  G.muggedCharacter = {muggedFromPlayer: ctx.currentPlayer, muggedToCharacter: toSteal};
}

/**
 * Switches player hand with chosen player.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {int} changeHandsWith - player number to switch hands with
 */
function magicianPowerA(G, ctx, changeHandsWith) {
  const resultSecret = {...G.secret};

  const currentPlayerHand = [...G.secret[ctx.currentPlayer].hand];
  resultSecret[ctx.currentPlayer].hand = G.secret[changeHandsWith].hand
  resultSecret[changeHandsWith].hand = currentPlayerHand;

  return {...G, secret : resultSecret}
}

/**
 * Switches the player hand with the deck.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {[int]} changeMyHandIndx - array of index number from players hand to switch cards.
 */
function magicianPowerB(G, ctx, changeMyHandIndx) {
  // sort descending order
  changeMyHandIndx.sort(function(a,b){return b-a});
  const numOfCards = changeMyHandIndx.length;
  changeMyHandIndx.forEach(x => {
    G.deckOfDistricts.push(G.secret[ctx.currentPlayer].hand.splice(x,1)[0]);
  });
  for (let i = 0; i < numOfCards; i++) {
    G.secret[ctx.currentPlayer].hand.push(G.deckOfDistricts.shift());
  }
}

/**
 * Utility funtion to count how many cards of specific type of distric has the player
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {int} typeOfDistrict - type of the distric type which gives extra coins to the character
 */
function getExtraCoins(G, ctx, typeOfDistrict) {
  let goldDistrictCount = 0
  G.players[ctx.currentPlayer].builtCity.forEach(city => {
    if(city.type === typeOfDistrict) {
      goldDistrictCount = goldDistrictCount + 1;
    }
  });
  return goldDistrictCount
}

/**
 * Function that counts and adds coints to the character when specific type of city is built.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {int} typeOfDistrict - type of the distric type which gives extra coins to the character
 */
function addExtraCoin(G, ctx, typeOfDistrict) {
  let addedGold = getExtraCoins(G, ctx, typeOfDistrict);
  console.log("<-------Extra coins to add:" + addedGold);
  while(G.pileOfCoins !== 0 && addedGold !== 0) {
    G.pileOfCoins = G.pileOfCoins - 1;
    addedGold = addedGold - 1;
    G.players[ctx.currentPlayer].coins = G.players[ctx.currentPlayer].coins + 1;
  }
}

export function WarlordPower(G, ctx, destroy) {
  // destroy: {
  //  player: Int,
  //  builtCityHandIndx: Int, 
  // }

  let destroyedCity = G.players[destroy.player].builtCity.splice(destroy.builtCityHandIndx, 1)[0];
  G.players[ctx.currentPlayer].coins =  G.players[ctx.currentPlayer].coins - destroyedCity.cost;
  G.pileOfCoins = G.pileOfCoins + destroyedCity.cost;
  G.deckOfDistricts.push(destroyedCity);
  
  // move user lowest character to characterdeck
  G.deckOfCharacters.push(G.players[ctx.currentPlayer].chosenCharacter.splice(0,1)[0]);
  ctx.events.endStage();
  ctx.events.endTurn();
}


/**
 * Function Use character Power, thakes the current user power and uses the power of that character.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 * @param {any} payload - different payload from the front.
 */
export function UseCharacterPower(G, ctx, payload) {
  console.log("<----Use character Power called with payload: "+ payload)
  // Check on front when input:
  // If power already used the btn is desabled.
  // Thief can not anounce assasin and assasin target.
  if (!G.players[ctx.currentPlayer].powerUsed) {
    G.players[ctx.currentPlayer].powerUsed = true;
    switch (getCurrentCharacter(G,ctx)) {
      case 1:
        // payload: int character order number to murder
        assasinPower(G, ctx, payload)
        break;
      case 2:
        // payload: int character order number to steal
        thiefPower(G, ctx, payload)
        break;
      case 3:
        // payload: {isOptionA: true, changeHandsWith: int, changeMyHandIndx: [int]}
        if(payload.isOptionA) {
          magicianPowerA(G, ctx, payload.changeHandsWith); // needs testing.
        } else {
          magicianPowerB(G, ctx, payload.changeMyHandIndx);
        }
        break;
      case 4:
        addExtraCoin(G, ctx, 0)
        break;
      case 5:
        addExtraCoin(G, ctx, 1)
        break;
      case 6:
        addExtraCoin(G, ctx, 2)
        break;
      case 7:
        // No use power, just explanaition
        break;
      case 8:
        addExtraCoin(G, ctx, 3)
        break;
      default:
        break;
    }
  }
}