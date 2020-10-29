// TODO: implement
// createDeckOfDistricts() -> returns {array of district cards}, set up random purple cards
// createDeckOfCharacters() -> returns {array of character cards}
//
// districtCard { 
//   cost: Int,
//   type: Int, // 0: Novel|Yellow, 1:Religious|Blue, 2: Trade|Green, 3: Military|Red, 4: Special|Purple
//   // specialPower: funct // implement after if ther is time
// }
//
// characterCard {
//   order : Int,
//   name : String,
//   power : funct
// }

export function createDeckOfDistricts() {
  const deck = []
  // Will need to keep a file or something with the distric information.
  for (let index = 0; index < 68; index++) {
    deck.push(createDistrictCard("Name: "+index, 3, 3));
  }
  return deck
}

export function createDeckOfCharacters() {
  const deck = [
    {order: 0, name: "Assasin"},
    {order: 1, name: "Thief"},
    {order: 2, name: "Magician"},
    {order: 3, name: "King"},
    {order: 4, name: "Bishop"},
    {order: 5, name: "Merchant"},
    {order: 6, name: "Architect"},
    {order: 7, name: "Warlord"},
  ]
  return deck
}

function createDistrictCard(name, cost, type) {
  return {name, cost, type}
  //not sure how to do specialPower which should be a function.
}

function createCharacterCard (order, name) {
  return {order, name}
  //not sure how to do specialPower which should be a function.
}