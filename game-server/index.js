const admin = require('firebase-admin');
const {Server} = require('boardgame.io/server');
const {Firestore} = require('bgio-firebase');
const CitadelsGame = require('../src/game/CitadelsGame');
const serviceAccount = require('./firebaseServiceAccountKey.json');

const database = new Firestore({
  config: {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://citadels-ldaw.firebaseio.com',
  },
  dbPrefix: 'bgio_',
});

const server = Server({
  games: [CitadelsGame.default],
  db: database,
});

server.run(8000);
