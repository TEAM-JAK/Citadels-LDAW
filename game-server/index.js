const path = require('path');
const admin = require('firebase-admin');
const {Server} = require('boardgame.io/server');
const {Firestore} = require('bgio-firebase');
const {historyApiFallback} = require('koa2-connect-history-api-fallback');
const serve = require('koa-static');
const CitadelsGame = require('../src/game/CitadelsGame');
const {DEFAULT_PORT} = require('../src/game/config');
const serviceAccount = require('./firebaseServiceAccountKey.json');

const database = new Firestore({
  config: {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://citadels-ldaw.firebaseio.com',
  },
  dbPrefix: 'bgio_',
});

const root = path.join(__dirname, '../build');

const server = Server({
  games: [CitadelsGame.default],
  db: database,
});

// Solves the refresh problem when using History API
server.app.use(
  historyApiFallback({
    index: 'index.html',
    whiteList: ['/api', '/games'],
  }),
);
// Serves the React App
server.app.use(serve(root));

server.run(Number(process.env.APP_PORT || DEFAULT_PORT));
