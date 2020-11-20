// TODO: implement
// createDeckOfDistricts() -> returns {array of district cards}, set up random purple cards
// createDeckOfCharacters() -> returns {array of character cards}
//
// districtCard {
//   name: String,
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

export function CreateDeckOfDistricts() {
  const deck = []
  // Will need to keep a file or something with the distric information.
  for (let index = 0; index < 68; index++) {
    deck.push(CreateDistrictCard("Name: "+index, (Math.floor(Math.random() * 3) + 1), Math.floor(Math.random() * 4)), "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fblue%2Fcatedral.jpg?alt=media&token=e21f93a0-146d-4aa8-a31e-86407ce0f2b6");
  }
  return deck
}

export function CreateDeckOfCharacters() {
  const backSrc = "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fback_gray.jpg?alt=media&token=7a1f8e7e-4a08-426a-9edd-09e60e22496a";
  const deck = [
    {order: 1, name: "Assasin", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fasesino.jpg?alt=media&token=03ceea66-dbc1-435d-b46e-1c1edd48b141", back: backSrc},
    {order: 2, name: "Thief", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fladron.jpg?alt=media&token=dfd057fc-3073-40ce-9053-bad997173482", back: backSrc},
    {order: 3, name: "Magician", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fmago.jpg?alt=media&token=7ee85db5-3682-486d-820b-2225fce7aea5", back: backSrc},
    {order: 4, name: "King", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Frey.jpg?alt=media&token=60239d45-6c7c-424c-9b77-e2e10c38ad86", back: backSrc},
    {order: 5, name: "Bishop", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fobispo.jpg?alt=media&token=fda603aa-89c4-4692-b09a-e823940d2409", back: backSrc},
    {order: 6, name: "Merchant", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fmercader.jpg?alt=media&token=2705ddf3-cf31-47c5-9a79-56f462f43085", back: backSrc},
    {order: 7, name: "Architect", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Farquitecto.jpg?alt=media&token=ee9cee94-7064-4d4e-8f81-760e2df8c772", back: backSrc},
    {order: 8, name: "Warlord", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fbase%2Fguerrero.jpg?alt=media&token=f56f6050-9c7f-47df-93f6-3b8d157f4b89", back: backSrc},
  ]
  const specialCharacters = [
    {order: 1, name: "Witch", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Fbruja.jpg?alt=media&token=ecb9c8f3-0d57-49e9-802c-ef714bcbc7f9", back: backSrc},
    {order: 2, name: "Tax Collector", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Frecaudador.jpg?alt=media&token=a2197f82-7bb6-4d9d-a6f5-84b84f214e06", back: backSrc},
    {order: 3, name: "Wizard", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Fhechicero.jpg?alt=media&token=e6869073-ead8-49c1-8544-f4eedb17ee53", back: backSrc},
    {order: 4, name: "Emperor", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Femperador.jpg?alt=media&token=090e596a-089c-419c-bc9b-e497a7c38e66", back: backSrc},
    {order: 5, name: "Abbot", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Fabad.jpg?alt=media&token=ad3b577d-2a42-45ad-b55f-2c10926d60c7", back: backSrc},
    {order: 6, name: "Alchemist", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Falquimista.jpg?alt=media&token=b212e452-208d-4e7a-ac49-1b86190e20b8", back: backSrc},
    {order: 7, name: "Navigator", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Fnavegante.jpg?alt=media&token=ca05adf4-370b-4d40-a623-071e91c29358", back: backSrc},
    {order: 8, name: "Diplomat", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Fdiplomatico.jpg?alt=media&token=2f9dc4c6-d36b-48e8-90ac-586e564aab42", back: backSrc},
    {order: 9, name: "Artist", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Fartista.jpg?alt=media&token=ae23d6cf-6b55-40f1-bda4-1e25e5874069", back: backSrc},
    {order: 9, name: "Queen", front: "https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fcharacters%2Fextra%2Freina.jpg?alt=media&token=65331dac-2e78-4e75-9320-e176784b2111", back: backSrc},
  ]
  return deck
}

function CreateDistrictCard(name, cost, type, front) {
  const backImgUrl = 'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fback_orange.jpg?alt=media&token=4a5738af-f9f7-43e4-a3cf-62541b32f283';
  return {name: name, cost: cost, type: type, front: front, back: backImgUrl}
  //not sure how to do specialPower which should be a function.
}

function CreateCharacterCard (order, name) {
  return {order, name}
  //not sure how to do specialPower which should be a function.
}