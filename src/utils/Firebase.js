import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: '1:82097961134:web:dd88b4d82a6e50d23a953f',
  measurementId: 'G-9532JM468P',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.firestore = app.firestore();
  }

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  fetchUserProfile = async () => {
    const userData = await this.firestore
      .collection('Users')
      .doc(this.auth.currentUser.uid)
      .get();
    return userData.data();
  };

  updateProfile = (user) => {
    return this.firestore
      .collection('Users')
      .doc(this.auth.currentUser.uid)
      .update(user)
      .catch((error) => console.error('Error: ', error));
  };

  getAvailableRooms = () => {
    const rooms = [];
    this.firestore.collection('Room').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rooms.push({...doc.data(), id: doc.id});
      });
    });
    return rooms;
  };

  //   doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  //   doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
