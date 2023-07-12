import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
