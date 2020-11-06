import { CreateDeckOfDistricts, CreateDeckOfCharacters } from "./Cards.react";
import { GetPlayerOrderDrawPhase, GetPlayerOrderPlayPhase,
         SetDrawPhase, IsDrawPhaseOver, BeginPlayTurn, SetPlayPhase, IsPlayPhaseOver,
         CleanPlayPhase, GetCurrentSituation, RemoveSecretFromPlayer,
         IsGameOver, GameOver} from "./Logic.react";
import { ChooseCharacter, TakeCoin, TakeDistrictCard, BuildDistrict,
         SkipOrEndStage, UseCharacterPower, WarlordPower} from "./Moves.react";
// G {
//   pileOfCoins : 30,
//   deckOfDistricts: [districtCard],
//   deckOfCharacters: [characterCard],
//   faceDownCharacterCards: [characterCard],
//   faceUpCharacterCards: [characterCard],
//   playerWithCrown : Int,
//   finishedFirst: -1,
//   murderedCharacter: -1,
//   muggedCharacter: -1,
//   secret: {
//      0 : {
//        hand: [districtCard]
//      },
//      ...
//   },
//   players : { // In round table sit order
//      0 : {
//              playerstate with secret and non
//              public : {
//                coins: Int,
//                builtCity: [districtCard],
//                handCount : Int,
//                chosenCharacter: [characterCard],
//                powerUsed: bool,
//                districtBuiltOnTurn: int,
//              }
//            },
//      1 : {},
//      2 : {},
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
  //TODO
  return 4;
}

/**
 * Initial set up for one player.
 * @returns {any} JSON like set up for player.  
 */
function PlayerInitialSetUp() {
  return {
    public : {
      coins: 2,
      builtCity: [],
      handCount : 4,
      chosenCharacter: [],
      powerUsed: false,
      districtBuiltOnTurn: 0,
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
  let finishedFirst = -1;
  let murderedCharacter = -1;
  let muggedCharacter = -1;
  let secret = {}
  let players = {}
  for (let i = 0; i < ctx.numPlayers; i++) {
    players[i] = PlayerInitialSetUp();
    secret[i] = {};
    secret[i].hand = [];
    for (let j = 0; j < 4; j++) {
      secret[i].hand.push(deckOfDistricts.pop());
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
    secret,
    players
  }
}


const CitadelsGame = {
  name: "Citadels-Board-Game",

  setup: (ctx) => (GameSetUp(ctx)),

  //playerView: (G, ctx, playerID) => (RemoveSecretFromPlayer(G, ctx, playerID)), //not sure it works yet.

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
        onBegin: (G, ctx) => (BeginPlayTurn(G, ctx)),
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
            moves: {BuildDistrict, SkipOrEndStage, UseCharacterPower},
          },
          extraStage: {
            moves: {WarlordPower},
          },
        },
      },
      onBegin: (G, ctx) => (SetPlayPhase(G, ctx)),
      endIf: (G, ctx) => (IsPlayPhaseOver(G, ctx)),
      onEnd: (G, ctx) => (CleanPlayPhase(G, ctx)), //needs test
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