// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcpTeJagag9O_IRbPvfbkJxv4HW7j_IL8",
  authDomain: "gears-b7ead.firebaseapp.com",
  projectId: "gears-b7ead",
  storageBucket: "gears-b7ead.appspot.com",
  messagingSenderId: "403528323825",
  appId: "1:403528323825:web:5ed0098e252bde687d0f50",
  measurementId: "G-WY0RWV0T54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
