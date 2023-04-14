import { KeyboardAvoidingView, Text, View, Image, TouchableOpacity } from "react-native";
import { React, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import styles from "./styles/HomepageStyles";

import { getStoredScore, getStoredVal, addScore } from "../score";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const db = firebase.firestore();

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


  //Update the displayed score and values with update button
  const [score, setScore] = useState(null);
  const [vals, setVals] = useState(null);
  const getStoredData = async () => {
    const stored_score = await getStoredScore();
    const stored_vals = await getStoredVal();
    console.log("data");
    if(stored_score !== score) {
      setScore(stored_score);
      setVals(stored_vals); 
    }    
  };

  getStoredData()

  async function onUpdate() {
    await addScore();
    getStoredData();
    
  }
  
  
  
  // Displays loading screen while data is being fetched
  if (!user || !score || !vals) {
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
          <Text style={styles.dailyScoreLabel}>Score</Text>
          <Text style={styles.dailyScoreValue}>{score}</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Food</Text>
            <Text style={styles.scoreValue}>{vals.food}</Text>
          </View>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Transportation</Text>
            <Text style={styles.scoreValue}>{vals.transportation}</Text>
          </View>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Energy</Text>
            <Text style={styles.scoreValue}>{vals.electricity}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style = {{margin: 20, borderWidth: 1, padding: 20}}
        onPress={onUpdate}>
        <Text style={{textAlign: 'center'}}>Update</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Homepage;
