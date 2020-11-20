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

export function CreateDeckOfDistricts() {
  const deck = [];
  // Will need to keep a file or something with the distric information.
  for (let index = 0; index < 68; index++) {
    deck.push(
      CreateDistrictCard(
        'Name: ' + index,
        Math.floor(Math.random() * 3) + 1,
        Math.floor(Math.random() * 4),
      ),
    );
  }
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
