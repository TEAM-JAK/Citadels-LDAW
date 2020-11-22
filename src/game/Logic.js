import { EndTurn } from './Moves';
import { GetCurrentCharacter, FindPlayerWithCharacter} from '../components/game/Utiliy';

// TODO : needs testing not used yet.
export function RemoveSecretFromPlayer(G, ctx, playerID) {
  //return G with out secret from other players.
  //not working locally
  const newSecrets = { ...G.secret };

  for (const key in newSecrets) {
    console.log('key: ', key, ' PlayerID: ', playerID);
    if (key !== playerID) {
      newSecrets[key] = [];
    }
  }

  return { ...G, secret: newSecrets };
}

/**
 * Returns a shifted array for Draw Phase, the player with the crown starts and goes clockwise.
 * When number of players is 2-3 they choose 2 characters.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 * @returns {array} playerOrder - Order of players in Draw Phase
 */
export function GetPlayerOrderDrawPhase(G, ctx) {
  console.log('Entered GetPlayerOrderDrawPhase');
  let playerOrder = [...Array(ctx.numPlayers).keys()];
  let numPlayers = ctx.numPlayers;
  if (numPlayers < 4) {
    let doubleTurn = [...Array(ctx.numPlayers).keys()];
    playerOrder = playerOrder.concat(doubleTurn);
  }
  for (let i = 0; i < G.playerWithCrown; i++) {
    const element = playerOrder.shift();
    playerOrder.push(element);
  }
  return playerOrder;
}

/**
 * Returns the ordern in which the players will take turns depending on which character they chose,
 * if they are 2-3 players they play twice.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 * @returns {array} playerOrder - Order of players in Play Phase
 */
export function GetPlayerOrderPlayPhase(G, ctx) {
  let dict = {};
  for (let i = 0; i < ctx.numPlayers; i++) {
    for (let j = 0; j < G.players[i].chosenCharacter.length; j++) {
      let key = i + j * ctx.numPlayers;
      dict[key] = G.players[i].chosenCharacter[j].order;
    }
  }

  // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
  let playerOrder = Object.keys(dict).sort(function (a, b) {
    return dict[a] - dict[b];
  });
  if (ctx.numPlayers < 4) {
    for (let i = 0; i < playerOrder.length; i++) {
      playerOrder[i] = playerOrder[i] % ctx.numPlayers;
    }
  }

  // Maps keys to Int.
  playerOrder = playerOrder.map(function (x) {
    return parseInt(x, 10);
  });
  console.log('GetPlayerOrderPlayPhase');
  return playerOrder;
}

/**
 * Return a random number between min and max inclusive.
 * @param {int} min 
 * @param {int} max 
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * Intial set up for any number of players to start choosing characters.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 */
export function SetDrawPhase(G, ctx) {
  var randomNumber = Math.floor(Math.random() * 8); //random between 0 to 8
  G.faceDownCharacterCards.push(G.deckOfCharacters.splice(randomNumber, 1)[0]);
  if (ctx.numPlayers < 6 && ctx.numPlayers > 3) {
    randomNumber = Math.floor(Math.random() * 7);
    while (G.deckOfCharacters[randomNumber].order === 4) {
      randomNumber = Math.floor(Math.random() * 7);
    }
    G.faceUpCharacterCards.push(G.deckOfCharacters.splice(randomNumber, 1)[0]);
    if (ctx.numPlayers === 4) {
      randomNumber = randomNumber = Math.floor(Math.random() * 6);
      while (G.deckOfCharacters[randomNumber].order === 4) {
        randomNumber = Math.floor(Math.random() * 6);
      }
      G.faceUpCharacterCards.push(G.deckOfCharacters.splice(randomNumber, 1)[0]);
    }
    return G;
  }
}

/**
 * The draw phase finished when deck of characters is empty in any case.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 */
export function IsDrawPhaseOver(G, ctx) {
  let phaseIsComplete = G.deckOfCharacters.length === 0;
  return phaseIsComplete;
}

/**
 * Function called at the start of each players action turn. This checks when the player was mugged or murdered and moves the crown.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 */
export function BeginPlayTurn(G, ctx) {
  if (G.players[ctx.currentPlayer].chosenCharacter[0].order === 4) {
    G.playerWithCrown = ctx.currentPlayer;
  }

  if (GetCurrentCharacter(G, ctx) === G.murderedCharacter) {
    console.log(
      '<-------Player :' +
      ctx.currentPlayer +
      ' was murdered and lost turn with character: ' +
      GetCurrentCharacter(G, ctx),
    );
    EndTurn(G, ctx);
    return G;
  }

  if (GetCurrentCharacter(G, ctx) === G.muggedCharacter.muggedToCharacter) {
    if (G.muggedCharacter.muggedToCharacter === G.murderedCharacter) {
      console.log('Can not mugg dead people');
    } else {
      console.log('<-------Player :' + ctx.currentPlayer + ' was mugged: ');
      let muggedPlayer = FindPlayerWithCharacter(
        G,
        ctx,
        G.muggedCharacter.muggedToCharacter,
      );
      G.players[G.muggedCharacter.muggedFromPlayer].coins =
        G.players[G.muggedCharacter.muggedFromPlayer].coins +
        G.players[muggedPlayer].coins;
      G.players[muggedPlayer].coins = 0;
    }
  }

  return G;
}

/**
 * Orders arr of player when two caracter are chosen.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 */
export function SetPlayPhase(G, ctx) {
  let newPlayers = { ...G.players };
  if (ctx.numPlayers < 4) {
    for (const key in newPlayers) {
      newPlayers[key].chosenCharacter.sort(function (a, b) {
        return a.order - b.order;
      });
    }
  }
  return { ...G, players: newPlayers };
}

/**
 * Function to check weather play phase is over.
 * @param {any} G - Game State
 * @param {any} ctx - Game context 
 */
export function IsPlayPhaseOver(G, ctx) {
  // Considering that each play turn the character card is returned to deck of character from player who used it.
  // TODO: think of another way to manage the play turn. Because taking choose character is not proper.
  let deckCount =
    G.deckOfCharacters.length +
    G.faceDownCharacterCards.length +
    G.faceUpCharacterCards.length;
  return deckCount === 8;
}

/**
 * Cleans faceDownCharacterCards, faceUpCharacterCards so that deckOfCharacters is full again with 8 characters.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 */
export function CleanPlayPhase(G, ctx) {
  // reset murdered character per play phase.
  G.murderedCharacter = -1;
  G.muggedCharacter = { muggedFromPlayer: -1, muggedToCharacter: -1 };

  for (let i = 0; i < ctx.numPlayers; i++) {
    while (G.players[i].chosenCharacter.length !== 0) {
      G.deckOfCharacters.push(G.players[i].chosenCharacter.pop());
    }
  }

  while (G.faceDownCharacterCards.length !== 0) {
    G.deckOfCharacters.push(G.faceDownCharacterCards.pop());
  }

  while (G.faceUpCharacterCards.length !== 0) {
    G.deckOfCharacters.push(G.faceUpCharacterCards.pop());
  }

  return G;
}

/**
 * Function called to check if a game is finished by some player who built 7 cities.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 * @returns {boolean} gameIsOver - If a player finished building 7 districts
 */
export function IsGameOver(G, ctx) {
  let gameIsOver = false;
  if (G.finishedFirst !== -1 && ctx.phase === "drawPhase") {
    gameIsOver = true;
  }
  // might have to calculate here the scores. and send back to ctx.gameover
  return gameIsOver;
}

/**
 * Function called to score the game for each player. Scoring:
 * a) player point equal to cost of all build districts.
 * b) if it has one distric of each color +3 points
 * c) if finished building at least 7 building +2 points
 *    if it was the first +4 points.
 * @param {any} G - Game State 
 */
function GetScores(G) {
  let scores = {}
  for (let index = 0; index < G.players.length; index++) {
    let baseScore = 0;
    let extra = 0;
    let allTypes = 0;
    let hasAllColors = [false,false,false,false,false]

    // Checking a)
    for (let j = 0; j < G.players[index].builtCity.length; j++) {
      baseScore += G.players[index].builtCity[j].cost
      switch (G.players[index].builtCity[j].type) {
        case 0:
          hasAllColors[0] = true;
          break;
        case 1:
          hasAllColors[1] = true;
          break;
        case 2:
          hasAllColors[2] = true;
          break;
        case 3:
          hasAllColors[3] = true;
          break;
        case 4:
          hasAllColors[4] = true;
          break;
        default:
          break;
      }
    }

    // Checking b)
    if(hasAllColors[0] && hasAllColors[1] && hasAllColors[2] && hasAllColors[3] || hasAllColors[4]){
      allTypes = 3;
    }

    // Checking c)
    if(G.finishedFirst === index) {
      extra = 4;
    } else if (G.players[index].builtCity.length > 7){
      extra = 2;
    }

    scores[index] = baseScore + extra + allTypes;
  }

  return scores;
}

/**
 * Function called when game is finished.
 * @param {any} G - Game State
 * @param {any} ctx - Game context
 */
export function GameOver(G, ctx) {
  let scores = GetScores(G);
  // TODO : might have to clean, stop timeouts, animations, etc.
  return scores;
}