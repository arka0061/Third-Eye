import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
var fbconfig={
    apiKey: "AIzaSyCmyCAnEW6rP3_fUvCxtvD63LV7SzaDUIU",
    authDomain: "infodeck-483ed.firebaseapp.com",
    databaseURL: "https://infodeck-483ed.firebaseio.com",
    projectId: "infodeck-483ed",
    storageBucket: "infodeck-483ed.appspot.com",
    messagingSenderId: "64162882123",
    appId: "1:64162882123:web:98bf2bb5a742a07b2b23ce",
    measurementId: "G-L887XVV1WS"
  };

firebase.initializeApp(fbconfig);
firebase.firestore().settings({}); 
firebase.auth()
export default firebase;