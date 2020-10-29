//import { Ctx, Game } from "boardgame.io";
import { Shuffle } from "@material-ui/icons";
import { createDeckOfDistricts, createDeckOfCharacters } from "./Cards.react";
// G {
//   pileOfCoinss : 30,
//   deckOfDistricts: [districtCard],
//   deckOfCharacters: [characterCard],
//   playerWithCrown : Int,
//   players : { // In round table sit order
//      '0' : {
//              playerstate with secret and non
//              secret : {
//                hand: [districtCard],
//              },
//              public : {
//                coin: Int,
//                builtCity: [districtCard],
//                handCount : Int,
//                chosenCharacter: [characterCard],
//              }
//            },
//      '1' : {},
//      '2' : {},
//         ...
//   }
// }
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function gameSetUp(ctx) {
  let pileOfCoins = 30;
  let deckOfDistricts = createDeckOfDistricts();
  shuffle(deckOfDistricts);
  let deckOfCharacters = createDeckOfCharacters();
  shuffle(deckOfCharacters);
  let playerWithCrown = getOldestPlayer();
  let players = {}
  for (let i = 0; i < ctx.numPlayers; i++) {
    players[i] = playerInitialSetUp();
    for (let j = 0; j < 4; j++) {
      players[i].secret.hand.push(deckOfDistricts.pop());
    }
    pileOfCoins = pileOfCoins - 2;
  }
  return {
    pileOfCoins,
    deckOfDistricts,
    deckOfCharacters,
    playerWithCrown,
    players
  }
}

function getOldestPlayer() {
  //shoul look all players birthday and get the oldest player
  return 4;
}

function playerInitialSetUp() {
  return {
          secret : {
            hand: [],
          },
          public : {
            coin: 2,
            builtCity: [],
            handCount : 4,
            chosenCharacter: [],
          }
        }
}

function GetPlayerOrderDrawPhase (G, ctx) {
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

function GetPlayerOrderPlayPhase (G, ctx) {
  console.log("Entered GetPlayerOrderPlayPhase")
  let playerOrder = [...Array(ctx.numPlayers).keys()]
  // get into G and look for players and map order,  index is player order
  // and content is player Id, so if player0: is magician(3),player1: thief(2), player2: assasin(1)
  // the order will be [2,1,0]. character(#), (#-1) will be array index and content playerId
  return playerOrder
}

/**
 * Function that allows user to choose a character.
 * @param {G} G - Game state provided by boardGame.io
 * @param {ctx} ctx - ctx states provided by boardGame.io
 */
function ChooseCharacter(G, ctx) {
  console.log("Entered ChooseCharacter")
  // TODO: implement correctly for know it just pops from character deck
  G.players[ctx.currentPlayer].public.chosenCharacter.push(G.deckOfCharacters.pop())
}

/**
 * Function to take a coin in their turn.
 * @param {G} G 
 * @param {ctx} ctx 
 */
function TakeCoin(G, ctx) {
  console.log("TakeCoin called")
  // Check if G.pileOfCoins has more thatn 2 coins.
  G.players[ctx.currentPlayer].public.coin = G.players[ctx.currentPlayer].public.coin + 2;
  G.pileOfCoins = G.pileOfCoins - 2;
  //ctx.events.endStage();
}

/**
 * Function to take distric card in their turn
 * @param {G} G 
 * @param {ctx} ctx 
 */
function TakeDistrictCard(G, ctx) {
  // Takes top 2 district cards and allows user to choose between them
  console.log("TakeDistrictCard called")
  //ctx.events.endStage();
}

/**
 * Function to call when building a district card
 * @param {G} G 
 * @param {ctx} ctx 
 */
function BuildDistrict(G, ctx, handIndex) {
  console.log("Entered BuildDistrict")
  ctx.events.endStage();
  ctx.events.endTurn();
}

function EndDrawPhase(G, ctx) {
  let phaseIsComplete = G.deckOfCharacters.length <= 0
  return phaseIsComplete;
}

function CheckGameEnd(G, ctx) {
  console.log("Entered CheckGameEnd")
  return false
}

function GetCurrentSituation(G, ctx) {
  // TODO sets the current situation to all other users.
  // like, it is your turn, or it is player 0's turn, etc.
}

const CitadelsGame = {
  name: "Citadels-Board-Game",

  setup: (G, ctx) => (gameSetUp(G, ctx)),

  phases: {
    drawPhase: {
      turn: {
        order: {
          // Get the initial value of playOrderPos.
          // This is called at the beginning of the phase.
          first: (G, ctx) => 0,
          // Get the next value of playOrderPos.
          // This is called at the end of each turn.
          // The phase ends if this returns undefined.
          next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
          playOrder: (G, ctx) => (GetPlayerOrderDrawPhase(G, ctx)),
        },
        moveLimit : 1,
      },
      moves: {ChooseCharacter},
      endIf: (G, ctx) => (EndDrawPhase(G, ctx)), 
      next: 'playPhase',
      start: true,
    },

    playPhase: {
      turn: {
        activePlayers: {
          currentPlayer : {stage: 'takeActionStage', moveLimit: 1},
          //others: {stage: 'waitingStage'},
        },
        order: {
          first: (G, ctx) => 0,
          next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
          playOrder: (G, ctx) => (GetPlayerOrderPlayPhase(G, ctx)),
        },
        stages: {
          takeActionStage: {
            moves: {TakeCoin, TakeDistrictCard},
          },
          buildStage: {
            moves: {BuildDistrict},
          },
          waitingStage: {
            moves: {GetCurrentSituation},
          },
        },
      },
    },
  },
  
  // endIf: (G, ctx) => (CheckGameEnd(G, ctx)),
}

export default CitadelsGame;