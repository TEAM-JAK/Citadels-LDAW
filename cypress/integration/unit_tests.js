import {RemoveSecretFromPlayer, GetPlayerOrderDrawPhase, GetPlayerOrderPlayPhase, SetDrawPhase, IsPlayPhaseOver} from "../../src/components/game/Logic.react";

describe('Unit Tests', () => {
  it('Sign In', () => {
    cy.visit('http://localhost:3000/auth')

    cy.get('#sign-in-email-text-field')
      .type('test@test.com')
      .should('have.value', 'test@test.com')

    cy.get('#sign-in-password')
      .type('testing')
      .should('have.value', 'testing')

    cy.get('#sign-in-button')
      .click()
    
    cy.url().should('include', '/home')
  })

  let G = {
   pileOfCoins : 30,
   deckOfDistricts: [],
   deckOfCharacters: [{order: 1, name: "Assasin"},
                      {order: 2, name: "Thief"},
                      {order: 3, name: "Magician"},
                      {order: 4, name: "King"},
                      {order: 5, name: "Bishop"},
                      {order: 6, name: "Merchant"},
                      {order: 7, name: "Architect"},
                      {order: 8, name: "Warlord"}],
   faceDownCharacterCards: [],
   faceUpCharacterCards: [],
   playerWithCrown : 1,
   secret: {
      0 : {
        hand: [0],
      },
      1 : {
        hand: [1],
      },
      2 : {
        hand: [2],
      },
      3 : {
        hand: [3],
      },
      4 : {
        hand: [4],
      }
   },
   players : { // In round table sit order
      0 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 8, name: "Warlord"}],
        }
      },
      1 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 7, name: "Architect"}],
        }
      },
      2 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 6, name: "Merchant"}],
        }
      },
      3 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 4, name: "King"}],
        }
      },
      4 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 5, name: "Bishop"}],
        }
      },
   }
  }

  let ctx = {
    turn: 17,
    currentPlayer: '0',
    numPlayers: 5,
  }

  let G2P = {
   pileOfCoins : 30,
   deckOfDistricts: [],
   deckOfCharacters: [{order: 1, name: "Assasin"},
                      {order: 2, name: "Thief"},
                      {order: 3, name: "Magician"},
                      {order: 4, name: "King"},
                      {order: 5, name: "Bishop"},
                      {order: 6, name: "Merchant"},
                      {order: 7, name: "Architect"},
                      {order: 8, name: "Warlord"}],
   faceDownCharacterCards: [],
   faceUpCharacterCards: [],
   playerWithCrown : 1,
   secret: {
      0 : {
        hand: [0],
      },
      1 : {
        hand: [1],
      },
   },
   players : { // In round table sit order
      0 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 8, name: "Warlord"},
                            {order: 3, name: "Magician"}],
        }
      },
      1 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 4, name: "King"},
                            {order: 7, name: "Architect"}],
        }
      },
   }
  }

  let ctx2P = {
    turn: 17,
    currentPlayer: '0',
    numPlayers: 2,
  }

  let G3P = {
   pileOfCoins : 30,
   deckOfDistricts: [],
   deckOfCharacters: [{order: 1, name: "Assasin"},
                      {order: 2, name: "Thief"},
                      {order: 3, name: "Magician"},
                      {order: 4, name: "King"},
                      {order: 5, name: "Bishop"},
                      {order: 6, name: "Merchant"},
                      {order: 7, name: "Architect"},
                      {order: 8, name: "Warlord"}],
   faceDownCharacterCards: [],
   faceUpCharacterCards: [],
   playerWithCrown : 1,
   secret: {
      0 : {
        hand: [0],
      },
      1 : {
        hand: [1],
      },
      2 : {
        hand: [2],
      },
   },
   players : { // In round table sit order
      0 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 8, name: "Warlord"},
                            {order: 3, name: "Magician"}],
        }
      },
      1 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 4, name: "King"},
                            {order: 7, name: "Architect"}],
        }
      },
      2 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [{order: 1, name: "Assasin"},
                            {order: 6, name: "Merchant"}],
        }
      },
   }
  }

  let ctx3P = {
    turn: 17,
    currentPlayer: '0',
    numPlayers: 3,
  }


  it('RemoveSecretFromPlayer', () => {
    let resultG = {
   pileOfCoins : 30,
   deckOfDistricts: [],
   deckOfCharacters: [],
   faceDownCharacterCards: [],
   faceUpCharacterCards: [],
   playerWithCrown : 2,
   secret: {
      0 : {
        hand: [],
      },
      1 : {
        hand: [],
      },
      2 : {
        hand: [2],
      },
      3 : {
        hand: [],
      },
      4 : {
        hand: [],
      },
      5 : {
        hand: [],
      },
      6 : {
        hand: [],
      },
      7 : {
        hand: [],
      },
   },
   players : { // In round table sit order
      0 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [8],
        }
      },
      1 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [7],
        }
      },
      2 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [6],
        }
      },
      3 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [5],
        }
      },
      4 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [4],
        }
      },
      5 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [3],
        }
      },
      6 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [2],
        }
      },
      7 : {
        public : {
          coin: 2,
          builtCity: [],
          handCount : 1,
          chosenCharacter: [1],
        }
      },  
   }
    }
    expect(RemoveSecretFromPlayer(G, ctx, 2)).to.deep.equal(resultG)
  })

  it('GetPlayerOrderDrawPhase', () => {
    //test for 2 players
    let resultArray2P = [1,0,1,0]
    expect(GetPlayerOrderDrawPhase(G2P,ctx2P)).to.have.ordered.members(resultArray2P)

    //test for 3 players
    let resultArray3P = [1,2,0,1,2,0]
    expect(GetPlayerOrderDrawPhase(G3P,ctx3P)).to.have.ordered.members(resultArray3P)

    //test for 4-7 players (using 5 players for test)
    let resultArray = [1,2,3,4,0]
    expect(GetPlayerOrderDrawPhase(G,ctx)).to.have.ordered.members(resultArray)
  })

  it('GetPlayerOrderPlayPhase', () => {

    //test for 2 players
    let resultArray2P = [0,1,1,0]
    expect(GetPlayerOrderPlayPhase(G2P,ctx2P)).to.have.ordered.members(resultArray2P)

    //test for 3 players
    let resultArray3P = [2,0,1,2,1,0]
    expect(GetPlayerOrderPlayPhase(G3P,ctx3P)).to.have.ordered.members(resultArray3P)

    //test for 4-7 players (using 5 players for test)
    let resultArray = [3,4,2,1,0]
    expect(GetPlayerOrderPlayPhase(G,ctx)).to.have.ordered.members(resultArray)
  })

  it('SetDrawPhase', () => {
    let GAfter = SetDrawPhase(G,ctx)
    expect(GAfter.deckOfCharacters.length).to.equal(6)
    expect(GAfter.faceDownCharacterCards.length).to.equal(1)
    expect(GAfter.faceUpCharacterCards.length).to.equal(1)
  })

  it('IsPlayPhaseOver', () => {
    let result = true;
    expect(IsPlayPhaseOver(G, ctx)).to.equal(result)
  })




})