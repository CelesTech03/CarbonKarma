// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID} from "@env"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth };

const firestore = firebase.firestore();

// Creates new user document (data)
export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  // Gets user reference with the path users/ (user colelction) and a unique user id
  const userRef = firestore.doc(`users/${user.uid}`);
  // Fetches document at this location
  const snapshot = await userRef.get();

  // If there is no document (snapshot) of user then create one
  if (!snapshot.exists) {
    const {email} = user;
    const {userName, fullName} = additionalData;

    try {
      userRef.set({
        email,
        fullName,
        userName,
        createdAt: new Date(),
      });
    } catch(error) {
      console.log('Error in creating user', error);
    }
  }
}
