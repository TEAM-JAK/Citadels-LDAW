function IsMyTurn(currentPlayer, playerID) {
  console.log(currentPlayer);
  console.log(playerID);
  let isMyTurn = false;
  if (currentPlayer === playerID) {
    isMyTurn = true;
  }
  return isMyTurn
}

function HashOfString(string) {
  var hash = 0, i, chr;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function FindPlayerWithCharacter(G, numPlayers, characterOrder) {
  for (let i = 0; i < numPlayers; i++) {
    if (G.players[i].chosenCharacter.some(e => e.order === characterOrder)){
      return i
    }    
  }
  return -1;
}

/**
 * Utility function check weather the player still can build.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
function CanBuild(G, ctx) {
  let canBuild = false;
  if(G.players[ctx.currentPlayer].districtBuiltOnTurn === 0 || (G.players[ctx.currentPlayer].districtBuiltOnTurn < 3 && getCurrentCharacter(G, ctx) === 7)){
    canBuild = true;
  }
  return canBuild;
}

/**
 * Utility function to get current character from player. This works given that choosen characters are sorted in setPlayPhase() and after each turn the character is returned to deck of characters.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
function getCurrentCharacter(G, ctx) {
  console.log("called getCurrentChar with:" + ctx.currentPlayer)
  let currentCharater = -1;
  currentCharater = G.players[ctx.currentPlayer].chosenCharacter[0].order;
  return currentCharater
}

function GetCurrentSituation(G, ctx) {
  console.log('Entered GetCurrentSituation', ctx.phase, ctx.activePlayers);
  // TODO sets the current situation to all other users.
  // like, it is your turn, or it is player 0's turn, etc.
  let currentSituation
  currentSituation = {
    phase: ctx.phase,
    activePlayer: ctx.activePlayers != null ? ctx.activePlayers[0] : "none", 
  }
  return currentSituation;
}

export {IsMyTurn, HashOfString, FindPlayerWithCharacter, CanBuild, GetCurrentSituation};
