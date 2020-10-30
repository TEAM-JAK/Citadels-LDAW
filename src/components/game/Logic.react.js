export function RemoveSecretFromPlayer (G, ctx, playerID) {
  //return G with out secret from each player.
  return G
}

export function GetPlayerOrderDrawPhase (G, ctx) {
  console.log("Entered GetPlayerOrderDrawPhase")
  // Get last King and should go clockwise so shift the array so the last
  // king player is start.
  let playerOrder = [...Array(ctx.numPlayers).keys()]
  // shift array so the last king starts.
  for (let i = 0; i < G.playerWithCrown; i++) {
    const element = playerOrder.shift();
    playerOrder.push(element);
  }
  return playerOrder
}

export function GetPlayerOrderPlayPhase (G, ctx) {
  console.log("Entered GetPlayerOrderPlayPhase")
  let playerOrder = [...Array(ctx.numPlayers).keys()]
  // get into G and look for players and map order,  index is player order
  // and content is player Id, so if player0: is magician(3),player1: thief(2), player2: assasin(1)
  // the order will be [2,1,0]. character(#), (#-1) will be array index and content playerId
  // Change current king order.
  return playerOrder
}

export function SetDrawPhase(G, ctx) {
  //setup:
  //   deckOfCharacters: [characterCard],
  //   faceDownCharacterCards: [characterCard],
  //   faceUpCharacterCards: [characterCard],
}

export function IsDrawPhaseOver(G, ctx) {
  //console.log("Entered EndDrawPhase")
  let phaseIsComplete = G.deckOfCharacters.length <= 0
  if (phaseIsComplete) {
    console.log("True End Draw Phase")
  }
  return phaseIsComplete;
}

export function CleanPlayPhase(G, ctx) {
  //clean players choosen character to character deck.
}

export function IsPlayPhaseOver(G, ctx) {
  //console.log("Entered EndPlayPhase");
  let phaseIsComplete = ctx.turn % 17 === 0;
  if (phaseIsComplete) {
    console.log("True End Play Phase")
  }
  return phaseIsComplete;
}


export function IsGameOver(G, ctx) {
  //console.log("Entered CheckGameEnd");
  return false
}

export function GetCurrentSituation(G, ctx) {
  console.log("Entered GetCurrentSituation");
  // TODO sets the current situation to all other users.
  // like, it is your turn, or it is player 0's turn, etc.
}

export function GameOver(G, ctx){
  //scoring and all other things.
}