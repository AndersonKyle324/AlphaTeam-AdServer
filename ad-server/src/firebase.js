import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCn8IHqcuT8A2Xmx18VqjoU60htlgrt5yo",
  authDomain: "ifixit-ad-server-edd98.firebaseapp.com",
  databaseURL: "https://ifixit-ad-server-edd98.firebaseio.com",
  projectId: "ifixit-ad-server-edd98",
  storageBucket: "ifixit-ad-server-edd98.appspot.com",
  messagingSenderId: "562021073011",
  appId: "1:562021073011:web:0b418c6a5281cf3c0d6a06",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
