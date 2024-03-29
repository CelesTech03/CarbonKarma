// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, doc, addDoc, updateDoc, getFirestore } from "firebase/firestore";
import { updateEmail, updatePassword } from "firebase/auth";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { initializeAuth } from 'firebase/auth/react-native';
import { getAuth } from 'firebase/auth/react-native';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

/* 
References:
Firebase Manage Users Documentation: https://firebase.google.com/docs/auth/web/manage-users,
Firebase Authentication Persistence: https://firebase.google.com/docs/auth/web/auth-state-persistence
*/

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

let auth = getAuth(app);
if(auth == undefined) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) //enable authentication persistence
  });
}

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
      console.log('Error in creating user', error);
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

export const addFoodOrder = async (amount, valueFood, valueLoc, date, score_change) => {
  // Fetches current user
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  try {
    // Create a new food order subcollection and add the data
    const newFoodOrderRef = await addDoc(
      collection(currentUserDocRef, "foodOrders"),
      {
        amount: amount,
        food: valueFood,
        location: valueLoc,
        date: date,
        score_change: score_change,
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

export const addEnergyEntry = async (amount, valueEnergy, date, score_change, timestamp) => {
  // Fetches current user
  const currentUserId = auth.currentUser.uid;
  const currentUserDocRef = doc(db, "users", currentUserId);

  try {
    // Create a new energy entry subcollection and add the data
    const newEnergyEntryRef = await addDoc(
      collection(currentUserDocRef, "energyEntries"),
      {
        amount: amount,
        energy: valueEnergy,
        date: date,
        score_change: score_change,
        timestamp: timestamp,
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

export const addTransport = async (method, mileage, date, score_change) => {
  // Gets the current user
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = doc(db, "users", currentUserId)

  // Adds the User mileage to the subcollection
  try {
    const newTransportRef = await addDoc(
      collection(currentUserDocRef, "UserTransports"), {
      method: method,
      mileage: mileage,
      date: date,
      score_change: score_change,
    }
    );
    console.log("Added User Transport for ID: ", newTransportRef.id)
  } catch (error) {
    console.log("Failed to add User Transport: ", error)
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
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = doc(db, "users", currentUserId)

  // Updates User doc with onboarding answer
  try {
    updateDoc(currentUserDocRef, {
      vehicle: car
    })
  } catch (error) {
    console.log("Failed to add car.")
  }
}

export const UpdateGas = async (gas) => {
  // Gets the current User
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = doc(db, "users", currentUserId)

  // Updates User doc with onboarding answer
  try {
    updateDoc(currentUserDocRef, {
      gas: gas
    })
  } catch (error) {
    console.log("Failed to add gas.")
  }
}

export const UpdateSolar = async (solar) => {
  // Gets the current User
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = doc(db, "users", currentUserId)

  // Updates User doc with onboarding answer
  try {
    updateDoc(currentUserDocRef, {
      solar: solar
    })
  } catch (error) {
    console.log("Failed to add solar.")
  }
}

export const UpdateLoc = async (new_location) => {
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = doc(db, "users", currentUserId)

    await updateDoc(currentUserDocRef, {
      address: new_location
    })
    console.log("Changed address.")
}

export const UpdateEmail = async (new_email) => {
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = doc(db, "users", currentUserId)

  updateEmail(auth.currentUser, new_email).then(() => {
    updateDoc(currentUserDocRef, {
      email: new_email
    })
    console.log("Changed email on firebase.")
  })

  console.log("Changed email.")
}

export const UpdatePass = async (new_password) => {
  const currentUserId = auth.currentUser.uid
  reauthenticateWithCredential(currentUserId, new_password).then(() => {
    updatePassword(auth.currentUser, new_password).then(() => {
      console.log('Password was updated.')
    }).catch((error) => {
      console.log('Password was not updated.')
    }).catch(console.log('User was not authenticated.'))

  })

}

export const UpdateScore = async (new_score) => {
  // Gets the current User
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = doc(db, "users", currentUserId)

  //Updates the score
  await updateDoc(currentUserDocRef, {
    score: new_score
  })
}

export const UpdateLastAdd = async (timestamp) => {
  // Gets the current User
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = doc(db, "users", currentUserId)

  //Updates the last add time
  await updateDoc(currentUserDocRef, {
    lastAddTime: timestamp
  })
}

export const getLastAdd = async () => {
  let lastAdd = null;

  // Gets the current User
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = firebase.firestore().collection("users").doc(currentUserId);

  //Gets the last add time
  await currentUserDocRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        lastAdd = snapshot.data().lastAddTime;
      }
    });
    return lastAdd;
}

export const getScore = async () => {
  let score = null;

  // Gets the current User
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = firebase.firestore().collection("users").doc(currentUserId);

  //Gets the score
  await currentUserDocRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        score = snapshot.data().score;
      }
    });   

  return score; 
}

export const getVal = async () => {
  let vals = {
    electricity: 0,
    food: 0,
    transportation: 0
  };

  // Gets the current User
  const currentUserId = auth.currentUser.uid
  const currentUserDocRef = firebase.firestore().collection("users").doc(currentUserId);

  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = month + '/' + day + '/' + year;

  //Gets the score change of all transportation entry submissions
  //made in current day.
  await currentUserDocRef
    .collection("UserTransports")
    .where("date", "==", date)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        vals.transportation += Number(doc.data().score_change);
      });
    });

  //Gets the score change of all energy entry submissions
  //made in current day.  
  await currentUserDocRef
    .collection("energyEntries")
    .where("date", "==", date)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        vals.electricity += doc.data().score_change;
      });
    });

  //Gets the score change of all food entry submissions
  //made in current day.
  await currentUserDocRef
    .collection("foodOrders")
    .where("date", "==", date)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        vals.food += doc.data().score_change;
      });
    });
  return vals;
}

export const getLastAllow = async () => {
  let last_allow = null;

  // Gets the current User
  const currentUserId = auth.currentUser.uid
  const currentUserEnergyRef = firebase.firestore().collection('users').doc(currentUserId);

  //Gets the timestamp of the most recent electricity entry submission
  await currentUserEnergyRef
          .collection("energyEntries")
          .orderBy("timestamp", "desc")
          .limit(1)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              last_allow = doc.data().timestamp;
            })
          });
  return last_allow;
}