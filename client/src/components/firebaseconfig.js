import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
   apiKey: "AIzaSyDt346ZrAxJNgoCk0SrBsY6gakN0e6EESs",
  authDomain: "demotest-4b0c0.firebaseapp.com",
  projectId: "demotest-4b0c0",
  storageBucket: "demotest-4b0c0.appspot.com",
  messagingSenderId: "814026175879",
  appId: "1:814026175879:web:229f96f1af3bcf94148f22",
  measurementId: "G-JGFK0X71NZ"
});

export const auth = app.auth();
export default app;
export const storage = getStorage(app, "gs://demotest-4b0c0.appspot.com");