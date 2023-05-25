import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBwXt6oNSioY33m0L1m-3Hr1YVjgWpwiSs',
  authDomain: 'todoapptest-63ffd.firebaseapp.com',
  databaseURL: 'https://todoapptest-63ffd-default-rtdb.firebaseio.com',
  projectId: 'todoapptest-63ffd',
  storageBucket: 'todoapptest-63ffd.appspot.com',
  messagingSenderId: '616752539096',
  appId: '1:616752539096:web:a415bc480fb4517ebb7ead'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();

export { firebaseAuth };
