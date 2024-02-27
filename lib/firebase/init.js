// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq72PSNdRUKPo6q1LlpHEvzMwH2WaFF1I",
  authDomain: "leal-firebase.firebaseapp.com",
  projectId: "leal-firebase",
  storageBucket: "leal-firebase.appspot.com",
  messagingSenderId: "335720260295",
  appId: "1:335720260295:web:2c0d7e9c78e7a7777c54e2",
  measurementId: "G-7HFHKRK765",
};

const app = initializeApp(firebaseConfig);
export default app;
