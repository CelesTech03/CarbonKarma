import { KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { React, useState, useEffect } from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useIsFocused } from "@react-navigation/native";
import { collection } from "@firebase/firestore";
import { Col, Row, Grid } from "react-native-easy-grid";
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

{/* Screen also uses a third-party library for displaying gradient backgrounds, react-native-linear-gradient. Its proper usage is documented at
https://blog.logrocket.com/complex-gradients-react-native-linear-gradient/ */}

const HistoryScreen = ({ navigation }) =>  {
  const isFocused = useIsFocused();

  const db = firebase.firestore();
  const [foodOrders, setFoodOrders] = useState(null);
  const [energyOrders, setEnergyOrders] = useState(null);
  const [transportOrders, setTransportOrders] = useState(null);

  { /* For choosing which button to highlight; default is 0 for Food button; set to 1 for Energy; set to 2 for Transportation */ }
  const [buttons, setButtons] = useState(0);
  
  // Fetches user data from the users collection in database using their uid (unique id) and sort by their dates in descending order.
  useEffect(() => {
    if (isFocused) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // get the foodOrders collection and add all documentions in the collection to a temp array
          db.collection("users")
            .doc(user.uid).collection("foodOrders").orderBy("date", "desc")
            .get()
            .then(querySnapshot => {       
              let temp = [];

              querySnapshot.forEach(documentSnapshot => {
                temp.push({id: documentSnapshot.id, data:documentSnapshot.data()});
              });

              setFoodOrders(temp);
              //console.log(foodOrders.length)
            });

          // get the energyEntries collection and add all documentions in the collection to a temp array
          db.collection("users")
            .doc(user.uid).collection("energyEntries").orderBy("date", "desc")
            .get()
            .then(querySnapshot => {       
              let temp = [];

              querySnapshot.forEach(documentSnapshot => {
                temp.push({id: documentSnapshot.id, data:documentSnapshot.data()});
              });

              setEnergyOrders(temp);
            });

          // get the foodOrders collection and add all documentions in the collection to a temp array
          db.collection("users")
            .doc(user.uid).collection("UserTransports").orderBy("date", "desc")
            .get()
            .then(querySnapshot => {       
              let temp = [];

              querySnapshot.forEach(documentSnapshot => {
                temp.push({id: documentSnapshot.id, data:documentSnapshot.data()});
              });

              setTransportOrders(temp);
            });
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

  { /* If buttons == 0, display all the user's past Food entries. If buttons == 1, display all the user's past Energy entries.
  Otherwise, display all the user's past Transportation entries. Clicking one of the buttons near the top of the screen updates the
  value of buttons variable. */ }
  if (buttons == 0) {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} behavior="padding">
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,255,0.75)', 'transparent']}
          style={styles.top}
        >
          <Text style={styles.title}>History</Text>
        </LinearGradient>

        {/* Buttons to choose type of food */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setButtons(0);
            }}
            style={[
              buttons == 0 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 0 ? styles.textSelected : styles.textNotSelected,
            ]}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(1);
            }}
            style={[
              buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 1 ? styles.textSelected : styles.textNotSelected,
            ]}>Energy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(2);
            }}
            style={[
              buttons == 2 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 2 ? styles.textSelected : styles.textNotSelected,
            ]}>Transport</Text>
          </TouchableOpacity>
        </View>

        {foodOrders.map((order) => (
          <View style={styles.entryContainer} key={order.id}>
            <View>
              <Text style={styles.date}>{order.data.date}</Text>
              <View style={styles.innerContainer}>
                <Text style={styles.item}>{order.data.food}</Text>
                <Text style={styles.location}> @ {order.data.location}</Text>
                <Text style={styles.amount}> (${order.data.amount})</Text>
                <Text style={styles.score_change}>{order.data.score_change}</Text>
              </View>
            </View>
          </View>
        ))}
      </KeyboardAwareScrollView>
    );
  }
  else if (buttons == 1) {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} behavior="padding">
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,255,0.75)', 'transparent']}
          style={styles.top}
        >
          <Text style={styles.title}>History</Text>
        </LinearGradient>

        {/* Buttons to choose type of food */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setButtons(0);
            }}
            style={[
              buttons == 0 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 0 ? styles.textSelected : styles.textNotSelected,
            ]}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(1);
            }}
            style={[
              buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 1 ? styles.textSelected : styles.textNotSelected,
            ]}>Energy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(2);
            }}
            style={[
              buttons == 2 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 2 ? styles.textSelected : styles.textNotSelected,
            ]}>Transport</Text>
          </TouchableOpacity>
        </View>
        {energyOrders.map((order) => (
          <View style={styles.entryContainer} key={order.id}>
            <View>
              <Text style={styles.date}>{order.data.date}</Text>
              <View style={styles.innerContainer}>
                <Text style={styles.item}>{order.data.energy}</Text>
                <Text style={styles.amount}> ({order.data.amount} kWh)</Text>
                <Text style={styles.score_change}>{order.data.score_change}</Text>
              </View>
            </View>
          </View>
        ))}
      </KeyboardAwareScrollView>
    );
  }
  else {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} behavior="padding">
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,255,0.75)', 'transparent']}
          style={styles.top}
        >
          <Text style={styles.title}>History</Text>
        </LinearGradient>

        {/* Buttons to choose type of food */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setButtons(0);
            }}
            style={[
              buttons == 0 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 0 ? styles.textSelected : styles.textNotSelected,
            ]}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(1);
            }}
            style={[
              buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 1 ? styles.textSelected : styles.textNotSelected,
            ]}>Energy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(2);
            }}
            style={[
              buttons == 2 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text style={[
              buttons == 2 ? styles.textSelected : styles.textNotSelected,
            ]}>Transport</Text>
          </TouchableOpacity>
        </View>

        {transportOrders.map((order) => (
          <View style={styles.entryContainer} key={order.id}>
            <View>
              <Text style={styles.date}>{order.data.date}</Text>
              <View style={styles.innerContainer}>
                <Text style={styles.item}>{order.data.method}</Text>
                <Text style={styles.amount}> ({order.data.mileage} miles)</Text>
                <Text style={styles.score_change}>{order.data.score_change}</Text>
              </View>
            </View>
          </View>
        ))}
        
      </KeyboardAwareScrollView>
    );
  }
};

export default HistoryScreen

// Screen styling
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    height: "150%",
  },
  top: {
    backgroundColor: "#1E90FF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: "10%",
    marginTop: "-3%",
    width: "120%",
  },
  title: {
    fontWeight: "400",
    fontSize: 20,
    color: "white",
    marginTop:"10%",
  },
  buttonContainer: {
    marginTop: "0%",
    flexDirection: "row",
    marginBottom: "5%",
  },
  buttonSelected: {
    borderColor: "#4169E1",
    borderWidth: 0,
    borderBottomWidth: 2,
    marginRight: "3%",
    marginLeft: "3%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textSelected: {
    color: "#4169E1",
  },
  buttonNotSelected: {
    borderColor: "#4169E1",
    borderWidth: 0,
    marginRight: "3%",
    marginLeft: "3%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textNotSelected: {
    color: "#505050",
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2.5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 5,
    marginVertical: 3,
    height: 50,
    width: "95%",
    backgroundColor: "#fff",
  },
  date: {
    color: "#505050",
    fontSize: 12,
  },
  innerContainer: {
    flexDirection: "row",
    width: 325,
  },
  item: {
    fontWeight: "bold",
  },
  amount: {
  },
  score_change: {
    marginLeft: 'auto',
  },
});
