import { CreateDeckOfDistricts, CreateDeckOfCharacters } from "./Cards.react";
import { GetPlayerOrderDrawPhase, GetPlayerOrderPlayPhase,
         SetDrawPhase, IsDrawPhaseOver, IsPlayPhaseOver,
         CleanPlayPhase, GetCurrentSituation, RemoveSecretFromPlayer,
         IsGameOver, GameOver} from "./Logic.react";
import { ChooseCharacter, TakeCoin, TakeDistrictCard, BuildDistrict,
         SkipStage, UseCharacterPower, WarlordPower} from "./Moves.react";
// G {
//   pileOfCoins : 30,
//   deckOfDistricts: [districtCard],
//   deckOfCharacters: [characterCard],
//   faceDownCharacterCards: [characterCard],
//   faceUpCharacterCards: [characterCard],
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

/**
 * Shuffles the given array using Durstenfeld Shuffle
 * @param {array} array - array to shuffle
 */
function Shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Gets the oldest player from the game to assign as King who goes
 * first in the game.
 * @returns {int} index of player. 
 */
function GetOldestPlayer() {
  return 4;
}

/**
 * Initial set up for one player.
 * @returns {any} JSON like set up for player.  
 */
function PlayerInitialSetUp() {
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

/**
 * Creates G, the game state and sets up for numPlayers in ctx
 * @param {any} ctx JSON like.
 * @returns {any} JSON like G the game state
 */
function GameSetUp(ctx) {
  let pileOfCoins = 30;
  let deckOfDistricts = CreateDeckOfDistricts();
  Shuffle(deckOfDistricts);
  let deckOfCharacters = CreateDeckOfCharacters();
  Shuffle(deckOfCharacters);
  let faceDownCharacterCards = [];
  let faceUpCharacterCards = [];
  let playerWithCrown = GetOldestPlayer();
  let players = {}
  for (let i = 0; i < ctx.numPlayers; i++) {
    players[i] = PlayerInitialSetUp();
    for (let j = 0; j < 4; j++) {
      players[i].secret.hand.push(deckOfDistricts.pop());
    }
    pileOfCoins = pileOfCoins - 2;
  }
  return {
    pileOfCoins,
    deckOfDistricts,
    deckOfCharacters,
    faceDownCharacterCards,
    faceUpCharacterCards,
    playerWithCrown,
    players
  }
}


const CitadelsGame = {
  name: "Citadels-Board-Game",

  setup: (ctx) => (GameSetUp(ctx)),

  playerView: (G, ctx, playerID) => (RemoveSecretFromPlayer(G, ctx, playerID)), //not sure it works yet.

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
      onBegin: (G, ctx) => (SetDrawPhase(G, ctx)), //needs test
      moves: {ChooseCharacter},
      endIf: (G, ctx) => (IsDrawPhaseOver(G, ctx)), 
      next: 'playPhase',
      start: true,
    },

    playPhase: {
      turn: {
        activePlayers: {
          currentPlayer : {stage: 'takeActionStage'},
          next: {
            currentPlayer : {stage: 'takeActionStage'},
          },
        },
        order: {
          first: (G, ctx) => 0,
          next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
          playOrder: (G, ctx) => (GetPlayerOrderPlayPhase(G, ctx)),
        },
        stages: {
          takeActionStage: {
            moves: {TakeCoin, TakeDistrictCard, UseCharacterPower},
            next: 'buildStage',
          },
          buildStage: {
            moves: {BuildDistrict, SkipStage, UseCharacterPower},
          },
          extraStage: {
            moves: {WarlordPower},
          },
        },
      },
      onEnd: (G, ctx) => (CleanPlayPhase(G, ctx)), //needs test
      endIf: (G, ctx) => (IsPlayPhaseOver(G, ctx)), 
      next: 'drawPhase',
    },
  },
  
  minPlayers: 2,
  maxPlayers: 7,

  endIf: (G, ctx) => (IsGameOver(G, ctx)),

  onEnd: (G, ctx) => (GameOver(G, ctx)),

  // Disable undo feature for all the moves in the game
  disableUndo: true,
}

export default CitadelsGame;