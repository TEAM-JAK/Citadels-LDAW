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
  G.players[ctx.currentPlayer].public.chosenCharacter.splice(0,0,G.deckOfCharacters.splice(indx1,1)[0])

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
function getCurrentCharacter(G, ctx) {
  let currentCharater = -1;
  currentCharater = G.players[ctx.currentPlayer].public.chosenCharacter[0].order;
  return currentCharater
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
    G.players[ctx.currentPlayer].public.coins = G.players[ctx.currentPlayer].public.coins + 1;
    G.pileOfCoins = G.pileOfCoins - 1;
  }

  if (G.pileOfCoins === 1) {
    G.players[ctx.currentPlayer].public.coins = G.players[ctx.currentPlayer].public.coins + 1;
    G.pileOfCoins = G.pileOfCoins - 1;
  } else {
    G.players[ctx.currentPlayer].public.coins = G.players[ctx.currentPlayer].public.coins + 2;
    G.pileOfCoins = G.pileOfCoins - 2;
  }

  // If architect draw 2 district cards and add to hand
  if(getCurrentCharacter(G, ctx) === 7 && G.deckOfCharacters.length > 2) {
    G.secret[ctx.currentPlayer].hand.concat(G.deckOfDistricts.splice(0,2));
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
    G.players[ctx.currentPlayer].public.coins = G.players[ctx.currentPlayer].public.coins + 1;
    G.pileOfCoins = G.pileOfCoins - 1;
  }

  // If architect draw 2 district cards and add to hand
  if(getCurrentCharacter(G, ctx) === 7 && G.deckOfCharacters.length > 2) {
    G.secret[ctx.currentPlayer].hand.concat(G.deckOfDistricts.splice(0,2));
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
  if(G.players[ctx.currentPlayer].public.districtBuiltOnTurn === 0 || (G.players[ctx.currentPlayer].public.districtBuiltOnTurn < 3 && getCurrentCharacter(G, ctx) === 7)){
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
    G.players[ctx.currentPlayer].public.districtBuiltOnTurn = G.players[ctx.currentPlayer].public.districtBuiltOnTurn + 1;
    // Check if user has sufficient coins, should be checked before allowing to select that hand.
    if(G.players[ctx.currentPlayer].public.coins >= G.secret[ctx.currentPlayer].hand[handIndex].cost) {
      G.players[ctx.currentPlayer].public.coins = G.players[ctx.currentPlayer].public.coins - G.secret[ctx.currentPlayer].hand[handIndex].cost;
      G.pileOfCoins = G.pileOfCoins + G.secret[ctx.currentPlayer].hand[handIndex].cost;
      G.players[ctx.currentPlayer].public.builtCity.push(G.secret[ctx.currentPlayer].hand.splice(handIndex,1)[0])
    }
  }
  // if Warlord(8) setStage('extraStage')
  if(getCurrentCharacter(G, ctx) === 8) {
    ctx.events.setStage('extraStage');
  }
}

/**
 * Function to call to end your turn, it returns to deck of characters your choosen card
 * and reset's powerUsed.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
export function SkipOrEndStage(G, ctx) {
  G.players[ctx.currentPlayer].public.powerUsed = false;
  G.players[ctx.currentPlayer].public.districtBuiltOnTurn = 0;

  // if Warlord(8) setStage('extraStage')
  if(getCurrentCharacter(G, ctx) === 8) {
    ctx.events.setStage('extraStage');
  } else {
    // move user lowest character to characterdeck
    G.deckOfCharacters.push(G.players[ctx.currentPlayer].public.chosenCharacter.splice(0,1)[0]);
    ctx.events.endStage();
    ctx.events.endTurn();
  }
}

function assasinPower(G, ctx, toMurder) { 
  G.murderedCharacter = toMurder;
}

function thiefPower(G, ctx, toSteal) {
  G.muggedCharacter = toSteal;
}

export function UseCharacterPower(G, ctx, payload) {
  // If power already used the btn is desabled.
  if (!G.players[ctx.currentPlayer].public.powerUsed) {
    G.players[ctx.currentPlayer].public.powerUsed = true;
    switch (getCurrentCharacter(G,ctx)) {
      case 1:
        assasinPower(G, ctx, payload)
        break;
      case 2:
        thiefPower(G, ctx, payload)
        break;
      case 3:

        break;
      case 4:

        break;
      case 5:
  
        break;
      case 6:

        break;
      case 7:

        break;
      case 8:

        break;
      default:
        break;
    }
  }


  
  // if ctx.is in takeActionStage change powerUsed to 1 and do not move
  // else move user lowest character to characterdeck
  //TODO
  // a) selects another character and kills, steal coins or changes cards
  // b) receive extra one gold pero color district in city
  // c) 
}

export function WarlordPower(G, ctx, destroy) {
  // destroy: {
  //  player: Int,
  //  builtCity: Int, 
  // } // send empty and do nothing?
  // recieve gold coins for each military district and choose to delete any district

  // move user lowest character to characterdeck
  G.deckOfCharacters.push(G.players[ctx.currentPlayer].public.chosenCharacter.splice(0,1)[0]);
  ctx.events.endStage();
  ctx.events.endTurn();
}