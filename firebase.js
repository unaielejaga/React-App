// Import the functions you need from the SDKs you need
//import * as firebase from 'firebase';
import firebase from 'firebase/app'; 
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwZvpIfvUtLr1NpEFG9C1g0xGY8CA7mkE",
  authDomain: "my-app-20856.firebaseapp.com",
  projectId: "my-app-20856",
  storageBucket: "my-app-20856.appspot.com",
  messagingSenderId: "524034589790",
  appId: "1:524034589790:web:b2b7486277860618b2e0cf"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0 ) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
export {auth}
