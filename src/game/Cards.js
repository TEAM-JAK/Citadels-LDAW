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

function districtCardInDeck(quantity, name, cost, type, imageURL) {
  let cards = [];
  for (let index = 0; index < quantity; index++) {
    cards.push({name: name, type: type, cost: cost, imageURL: imageURL});
  }
  return cards;
}

export function CreateDeckOfDistricts() {
  const deck = [];
  deck.push(
    ...districtCardInDeck(
      3,
      'Templo',
      1,
      1,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fblue%2Ftemplo.jpg?alt=media&token=2942172a-29de-4fcf-8ec1-ef95ef919c8d',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Iglesia',
      2,
      1,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fblue%2Figlesia.jpg?alt=media&token=008b54c2-55a9-4088-b997-f8310a0a1d76',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Monasterio',
      3,
      1,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fblue%2Fmonasterio.jpg?alt=media&token=3355cf48-1f74-4bac-89e3-e055df55823c',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      2,
      'Catedral',
      5,
      1,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fblue%2Fcatedral.jpg?alt=media&token=e21f93a0-146d-4aa8-a31e-86407ce0f2b6',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      2,
      'Ayuntamiento',
      5,
      2,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fgreen%2Fayuntamiento.jpg?alt=media&token=68d71e9a-0858-4f04-9267-878a528131d6',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Almacenes',
      3,
      2,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fgreen%2Falmacenes.jpg?alt=media&token=7809b068-c802-48ba-b05c-ff98e2b9573a',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      4,
      'Mercado',
      2,
      2,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fgreen%2Fmercado.jpg?alt=media&token=2b736349-d370-481c-b68f-92e7b7b343fd',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      5,
      'Taberna',
      1,
      2,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fgreen%2Ftaberna.jpg?alt=media&token=9bbee48d-140c-4ade-b3a6-add77193041e',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Puerto',
      4,
      2,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fgreen%2Fpuerto.jpg?alt=media&token=1ecf7239-773c-458f-904f-b00f650063f7',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Tienda',
      2,
      2,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fgreen%2Ftienda.jpg?alt=media&token=987005d7-a83c-43f9-a255-a000259f691a',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      2,
      'Fortaleza',
      5,
      3,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fred%2Ffortaleza.jpg?alt=media&token=4260bf11-ab74-438c-98d6-5b8d92604a58',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Prisión',
      2,
      3,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fred%2Fprision.jpg?alt=media&token=edeef978-a05e-4b70-9852-f238d45113b2',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Atalaya',
      1,
      3,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fred%2Fatalaya.jpg?alt=media&token=1558164b-dc8b-4e35-9254-1d966ac45240',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Cuartel',
      3,
      3,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fred%2Fcuartel.jpg?alt=media&token=6aeb48c0-f5ca-445e-aeb7-0c61f39878cf',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      3,
      'Palacio',
      5,
      0,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fyellow%2Fpalacio.jpg?alt=media&token=6139bca5-bdc1-4455-aa43-1f474594eccb',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      4,
      'Castillo',
      4,
      0,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fyellow%2Fcastillo.jpg?alt=media&token=d3230b61-e2a6-45ea-9410-eb08224e2ccd',
    ),
  );
  deck.push(
    ...districtCardInDeck(
      5,
      'Señoría',
      3,
      0,
      'https://firebasestorage.googleapis.com/v0/b/citadels-ldaw.appspot.com/o/cards%2Fdistricts%2Fyellow%2Fsenoria.jpg?alt=media&token=da3b04f7-b6a4-4a3b-a444-c48740308fc2',
    ),
  );

  // Will need to keep a file or something with the distric information.
  // for (let index = 0; index < 68; index++) {
  //   deck.push(
  //     CreateDistrictCard(
  //       'Name: ' + index,
  //       Math.floor(Math.random() * 3) + 1,
  //       Math.floor(Math.random() * 4),
  //     ),
  //   );
  // }
  return deck;
}

export function CreateDeckOfCharacters() {
  const deck = [
    {order: 1, name: 'Assasin'},
    {order: 2, name: 'Thief'},
    {order: 3, name: 'Magician'},
    {order: 4, name: 'King'},
    {order: 5, name: 'Bishop'},
    {order: 6, name: 'Merchant'},
    {order: 7, name: 'Architect'},
    {order: 8, name: 'Warlord'},
  ];
  return deck;
}

function CreateDistrictCard(name, cost, type) {
  return {name: name, cost: cost, type: type};
  //not sure how to do specialPower which should be a function.
}

function CreateCharacterCard(order, name) {
  return {order, name};
  //not sure how to do specialPower which should be a function.
}

// export function Cards(props) {
//   let cards = [];
//   for (let i = 0; i < 4; i++) {
//     cards.push(
//       <Card key={i} cardFrontImage={'assets/cards/cardfront.png'} isReversed={true} />,
//     );
//   }

//   return (
//     <div
//       style={{
//         width: '600px',
//         display: 'flex',
//         position: 'fixed',
//         left: '50%',
//         bottom: '50px',
//         transform: 'translateX(-50%)',
//       }}
//     >
//       {cards}
//     </div>
//   );
// }
