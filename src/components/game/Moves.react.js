import { INVALID_MOVE } from 'boardgame.io/core';

/**
 * Function that allows user to choose a character.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
export function ChooseCharacter(G, ctx) {
  console.log("Entered ChooseCharacter")
  // TODO: implement correctly for know it just pops from character deck
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
export function TakeDistrictCard(G, ctx) {
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
  ctx.events.endStage();
  ctx.events.endTurn();
}

/**
 * Function to call when doing nothing at Build stage
 * @param {G} G 
 * @param {ctx} ctx 
 */
export function SkipStage(G, ctx) {
  // if Warlord(8) setStage('extraStage')
  ctx.events.endStage();
  ctx.events.endTurn();
}

export function UseCharacterPower(G, ctx) {
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