import { KeyboardAvoidingView, Text, View, Image } from "react-native";
import { React, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import styles from "./styles/HomepageStyles";
import { getStoredScore, getStoredVal } from "../score";
import { useIsFocused } from "@react-navigation/native";

const Homepage = () => {
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const db = firebase.firestore();
  
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

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.username}>{user.userName}</Text>
        <Image
          source={require("../assets/who_pokemon.jpg")}
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
    </KeyboardAvoidingView>
  );
};

export default Homepage;
