import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDoy5oohVGs6FHZRaBUjvjyE7ZDb7Gk3BQ",
    authDomain: "discord-ishan.firebaseapp.com",
    databaseURL: "https://discord-ishan.firebaseio.com",
    projectId: "discord-ishan",
    storageBucket: "discord-ishan.appspot.com",
    messagingSenderId: "835008822004",
    appId: "1:835008822004:web:e68a056792cbb631727ca1",
    measurementId: "G-NE61JMT1GQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

