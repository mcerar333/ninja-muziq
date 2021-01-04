import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDPnRnmI56IPKi--7MKmrYty7q4KQSg3mo',
  authDomain: 'ninja-muziq.firebaseapp.com',
  projectId: 'ninja-muziq',
  storageBucket: 'ninja-muziq.appspot.com',
  messagingSenderId: '720366691958',
  appId: '1:720366691958:web:4fe9e8b7057ca7584e2157',
};

// Firebase Init
firebase.initializeApp(firebaseConfig);

// Firebase Services Init
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Firestore Timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, db, storage, timestamp };
