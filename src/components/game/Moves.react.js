import { INVALID_MOVE } from 'boardgame.io/core';

/**
 * Function that allows user to choose a character.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
export function ChooseCharacter(G, ctx, indx) {
  console.log("Entered ChooseCharacter")
  // TODO: implement correctly for know it just pops from character deck
  // if 2 players after chose place another card facedown so when 2 players two choses. First time it doesn't facedown
  // if 7 players and turn is 6, pass facedown to deckofcards. So player 7 has two options.
  // when left only one card in deck pass to facedown.
  G.players[ctx.currentPlayer].public.chosenCharacter.push(G.deckOfCharacters.pop())
}

/**
 * Function to take a coin in their turn.
 * @param {G} G 
 * @param {ctx} ctx 
 */
export function TakeCoin(G, ctx) {
  console.log("TakeCoin called")
  // Check if G.pileOfCoins has more thatn 2 coins.
  // If it is merchant(6) give one coin extra
  // If architect draw 2 district cards and add to hand
  G.players[ctx.currentPlayer].public.coin = G.players[ctx.currentPlayer].public.coin + 2;
  G.pileOfCoins = G.pileOfCoins - 2;
  ctx.events.endStage();
}

/**
 * Function to take distric card in their turn
 * @param {G} G 
 * @param {ctx} ctx 
 */
export function TakeDistrictCard(G, ctx, opt) {
  // Takes top 2 district cards and allows user to choose between them
  // If it is merchant(6) give one coin extra
  // If architect draw 2 district cards and add to hand
  console.log("TakeDistrictCard called")
  ctx.events.endStage();
}

/**
 * Function to call when building a district card
 * @param {G} G 
 * @param {ctx} ctx 
 */
export function BuildDistrict(G, ctx, handIndex) {
  console.log("Entered BuildDistrict")
  // if Warlord(8) setStage('extraStage')
  // move user lowest character to characterdeck
}

/**
 * Function to call when doing nothing at Build stage
 * @param {G} G 
 * @param {ctx} ctx 
 */
export function SkipOrEndStage(G, ctx) {
  // move user lowest character to characterdeck
  // if Warlord(8) setStage('extraStage')
  ctx.events.endStage();
  ctx.events.endTurn();
}

export function UseCharacterPower(G, ctx, character) {
  // if ctx.is in takeActionStage change powerUsed to 1 and do not move
  // else move user lowest character to characterdeck
  //TODO
  // a) selects another character and kills, stills coins or changes cards
  // b) receive extra one gold pero color district in city
  // c) 
}

export function WarlordPower(G, ctx, destroy) {
  // destroy: {
  //  player: Int,
  //  builtCity: Int, 
  // } // send empty and do nothing?
  // recieve gold coins for each military district and choose to delete any district
  ctx.events.endStage();
  ctx.events.endTurn();
}