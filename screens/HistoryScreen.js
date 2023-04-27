import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { React, useState, useEffect } from 'react'
import styles from "./styles/AuthStyle"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useIsFocused } from "@react-navigation/native";
import { collection } from "@firebase/firestore";

const HistoryScreen = ({ navigation }) =>  {
  const isFocused = useIsFocused();

  const db = firebase.firestore();
  const [foodOrders, setFoodOrders] = useState(null);

  // Fetches user data from the users collection in database using their uid (unique id)
  useEffect(() => {
    if (isFocused) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("users")
            .doc(user.uid).collection("foodOrders")
            .get()
            .then(querySnapshot => {       
              let temp = [];

              querySnapshot.forEach(documentSnapshot => {
                temp.push({id: documentSnapshot.id, data:documentSnapshot.data()});
              });

              setFoodOrders(temp);
              console.log(foodOrders.length)
            });
          //console.log(foodOrders);
        }
      });
    }
  }, [isFocused]);

  // Displays loading screen while data is being fetched
  if (!foodOrders) {
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
      <Text>This is the History page.</Text>
      {foodOrders.map((order) => (
        <Text style={styles.username}>
          Item: {order.data.food}   Location: {order.data.location}   Amount: ${order.data.amount}</Text>
      ))}
    </KeyboardAvoidingView>
  );
};

export default HistoryScreen