import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyBDjw7U935N7Zy6iv4HXzz0UEjCTCE8EWs",
//   authDomain: "calm-magpie-345711.firebaseapp.com",
//   projectId: "calm-magpie-345711",
//   storageBucket: "calm-magpie-345711.appspot.com",
//   messagingSenderId: "421939434729",
//   appId: "1:421939434729:web:08150ad27996cf469dcc78",
//   measurementId: "G-KVTDF4NHTS"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBguiRjbIFticVxTC4pbu2AQcSHZGF8qdo",
  authDomain: "alfheimnft.firebaseapp.com",
  projectId: "alfheimnft",
  storageBucket: "alfheimnft.appspot.com",
  messagingSenderId: "304583196532",
  appId: "1:304583196532:web:e17ff37f1969df32323621",
  measurementId: "G-X0V5FN33HC"
};
const app =  initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }