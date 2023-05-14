import {
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import styles from "./styles/HomepageStyles";
import { getStoredScore, getStoredVal } from "../score";
import { useIsFocused } from "@react-navigation/native";
import { resetScore } from "../score"; // for resetting scores, delete before release

const Homepage = () => {
  const isFocused = useIsFocused();
  /* 
  Fetch Avatar Reference:
  Firebase Download Files Documentation: https://firebase.google.com/docs/storage/web/download-files
  */
  const [userAvatarURL, setUserAvatarURL] = useState(null);
  const [user, setUser] = useState(null);
  const db = firebase.firestore();
  const storage = firebase.storage();
  // saves the current score
  const [score, setScore] = useState(null);

  // gets the current daily values subtracted from score
  const [values, setValues] = useState({
    electricity: 0,
    food: 0,
    transportation: 0,
  });

  // Fetches user data from the users collection in database using their uid (unique id)
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setUser(snapshot.data());
            }
          });
        // Retrieve user avatar
        const avatarRef = storage.ref().child(`avatars/${user.uid}`);
        avatarRef
          .getDownloadURL()
          .then((url) => {
            setUserAvatarURL(url);
          })
          .catch((error) => {
            console.log("Error getting user avatar from storage: ", error);
          });
      }
    });
    return () => unsubscribe();
  }, []);

  async function getScore() {
    setScore(await getStoredScore());
  }

  async function getValues() {
    setValues(await getStoredVal());
  }

  useEffect(() => {
    if (isFocused) {
      getScore();
      getValues();
    }
  }, [isFocused]);

  // Displays loading screen while data is being fetched
  if (!user) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <Text>Loading...</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // function to reset scores; delete before release
  async function resetHandler() {
    await resetScore();
    setScore(150);
    setValues({ electricity: 0, food: 0, transportation: 0 });
    console.log(
      "Homepage.js: scores reset, remember to delete button and function before release"
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.username}>{user.userName}</Text>
        <Image
          source={
            userAvatarURL
              ? { uri: userAvatarURL }
              : require("../assets/who_pokemon.jpg")
          }
          style={styles.avatar}
        />
      </View>
      <View style={styles.scoresContainer}>
        <View style={styles.score}>
          <Text style={styles.dailyScoreLabel}>Daily Score</Text>
          <Text style={styles.dailyScoreValue}>{score}</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Food</Text>
            <Text style={styles.scoreValue}>{values.food}</Text>
          </View>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Transportation</Text>
            <Text style={styles.scoreValue}>{values.transportation}</Text>
          </View>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Energy</Text>
            <Text style={styles.scoreValue}>{values.electricity}</Text>
          </View>
        </View>
      </View>

      {/* Button to reset scores; delete before release */}
      <View>
        <TouchableOpacity
          onPress={() => {
            resetHandler();
          }}
        >
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Homepage;
