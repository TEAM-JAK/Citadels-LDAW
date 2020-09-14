import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCQBdUbTiRwVVlwNzFk8qI06QsnHBWiOTo',
  authDomain: 'citadels-ldaw.firebaseapp.com',
  databaseURL: 'https://citadels-ldaw.firebaseio.com',
  projectId: 'citadels-ldaw',
  storageBucket: 'citadels-ldaw.appspot.com',
  messagingSenderId: '82097961134',
  appId: '1:82097961134:web:dd88b4d82a6e50d23a953f',
  measurementId: 'G-9532JM468P',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  //   doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  //   doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
