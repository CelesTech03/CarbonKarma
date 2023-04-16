// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";
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

const db = getFirestore(app);
export { db };

// Creates new user document (data)
export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  // Gets user reference with the path users/ (user collection) and a unique user id
  const userRef = firestore.doc(`users/${user.uid}`);
  // Fetches document at this location
  const snapshot = await userRef.get();

  // If there is no document (snapshot) of user then create one
  if (!snapshot.exists) {
    const { email } = user;
    const { userName, fullName } = additionalData;

    try {
      userRef.set({
        email,
        fullName,
        userName,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log("Error in creating user", error);
    }
  }
};

// Modifies existing user document (data)
// export const modifyUserDocument = async (additionalData) => {
//   // Gets user reference with the path users/ (user colelction) and a unique user id
//   const userRef = firestore.doc(`users/cpgqRKTwykOYQECZLeGSYIjPmTI3`);
//   // Fetches document at this location
//   const snapshot = await userRef.get();

//   // If there is a document (snapshot) of user then modify it
//   if (snapshot.exists) {
//     const {valueFood, valueLoc, amount} = additionalData;
//     console.log("firebase.js: ", additionalData);
//     try {
//       userRef.update({
//         //firstName: 'Ken',
//         food: valueFood,
//         location: valueLoc,
//         amount: amount[0],
//         modifiedAt: new Date(),
//       });
//     } catch(error) {
//       console.log('Error in creating user', error);
//     }
//   }
// }

export const addFoodOrder = async (amount, valueFood, valueLoc) => {
  // Fetches current user
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  try {
    // Create a new food order subcollection and add the data
    const newFoodOrderRef = await addDoc(
      collection(currentUserDocRef, "foodOrders"),
      {
        amount: amount[0],
        food: valueFood,
        location: valueLoc,
      }
    );
    console.log(
      "Firebase.js: New food order added with ID:",
      newFoodOrderRef.id
    );
  } catch (error) {
    console.error("Firebase.js: Error adding food order:", error);
  }
};

export const addEnergyEntry = async (amount, valueEnergy) => {
  // Fetches current user
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  try {
    // Create a new energy entry subcollection and add the data
    const newEnergyEntryRef = await addDoc(
      collection(currentUserDocRef, "energyEntries"),
      {
        amount: amount[0],
        energy: valueEnergy,
      }
    );
    console.log(
      "Firebase.js: New energy entry added with ID:",
      newEnergyEntryRef.id
    );
  } catch (error) {
    console.error("Firebase.js: Error adding energy entry:", error);
  }
};

export const addTransport = async (method, mileage) => {
  // Gets the current user
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  // Adds the User mileage to the subcollection
  try {
    const newTransportRef = await addDoc(
      collection(currentUserDocRef, "UserTransports"),
      {
        method: method,
        milage: mileage[0],
      }
    );
    console.log("Added User Transport for ID: ", newTransportRef.id);
  } catch (error) {
    console.log("Failed to add User Transport: ", error);
  }
};

export const UpdateCity = async (city) => {
  // Gets the current User
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  // Updates User doc with onboarding answer
  try {
    updateDoc(currentUserDocRef, {
      address: city,
    });
  } catch (error) {
    console.log("Failed to add city.");
  }
};

export const UpdateCar = async (car) => {
  // Gets the current User
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  // Updates User doc with onboarding answer
  try {
    updateDoc(currentUserDocRef, {
      vehicle: car,
    });
  } catch (error) {
    console.log("Failed to add car.");
  }
};

export const UpdateGas = async (gas) => {
  // Gets the current User
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  // Updates User doc with onboarding answer
  try {
    updateDoc(currentUserDocRef, {
      gas: gas,
    });
  } catch (error) {
    console.log("Failed to add gas.");
  }
};

export const UpdateSolar = async (solar) => {
  // Gets the current User
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  // Updates User doc with onboarding answer
  try {
    updateDoc(currentUserDocRef, {
      solar: solar,
    });
  } catch (error) {
    console.log("Failed to add solar.");
  }
};
