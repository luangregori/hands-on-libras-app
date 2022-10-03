import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAgyNaRpvJRF_sAj2K22lPopRaMKD2xSj8",
  authDomain: "hands-on-libras.firebaseapp.com",
  projectId: "hands-on-libras",
  storageBucket: "hands-on-libras.appspot.com",
  messagingSenderId: "233646485017",
  appId: "1:233646485017:web:ecaebaf16f2f7ca3ab4488"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export {app, firebase}