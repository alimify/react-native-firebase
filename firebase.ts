
  import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyaEAUtzU4plvChu4yITNBV6Y2soo_Zo0",
  authDomain: "inmogrdate.firebaseapp.com",
  projectId: "inmogrdate",
  storageBucket: "inmogrdate.appspot.com",
  messagingSenderId: "624409246318",
  appId: "1:624409246318:web:ceae017bccf8ad3fb3847f",
  measurementId: "G-PZEYZ089WE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {db};