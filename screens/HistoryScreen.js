import { KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { React, useState, useEffect } from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useIsFocused } from "@react-navigation/native";
import { collection } from "@firebase/firestore";
//import { Table, Row, Rows } from 'react-native-table-component';
import { Col, Row, Grid } from "react-native-easy-grid";

const HistoryScreen = ({ navigation }) =>  {
  const isFocused = useIsFocused();

  const db = firebase.firestore();
  const [foodOrders, setFoodOrders] = useState(null);
  const [energyOrders, setEnergyOrders] = useState(null);
  const [transportOrders, setTransportOrders] = useState(null);
  const [headers, setHeaders] = useState(['Date','Item','Location','Amount','Karma']);

  { /* For choosing which button to highlight; default is 0 for Food button; set to 1 for Energy; set to 2 for Transportation */ }
  const [buttons, setButtons] = useState(0);
  
  // Fetches user data from the users collection in database using their uid (unique id)
  useEffect(() => {
    if (isFocused) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // get the foodOrders collection
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

          // get the energyEntries collection
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

          // get the foodOrders collection
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

  if (buttons == 0) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>History</Text>

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
            <Text>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(1);
            }}
            style={[
              buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text>Energy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(2);
            }}
            style={[
              buttons == 2 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text>Transport</Text>
          </TouchableOpacity>
        </View>

        <Grid style={styles.table}>
          <Row style={styles.header_row}>
            <Col style={styles.column1}>
              <Text style={styles.header_text}>Date</Text>
            </Col>
            <Col style={styles.column1}>
              <Text style={styles.header_text}>Item</Text>
            </Col>
            <Col style={styles.column2}>
              <Text style={styles.header_text}>Location</Text>
            </Col>
            <Col style={styles.column3}>
              <Text style={styles.header_text}>Amount</Text>
            </Col>
            <Col style={styles.column3}>
              <Text style={styles.header_text}>Karma</Text>
            </Col>
          </Row>

          {foodOrders.map((order) => (
            <Row style={styles.row} key={order.id}>
              <Col style={styles.column1}>
                <Text style={styles.row_text} >{order.data.date}</Text>
              </Col>
              <Col style={styles.column1}>
                <Text style={styles.row_text}>{order.data.food}</Text>
              </Col>
              <Col style={styles.column2}>
                <Text style={styles.row_text}>{order.data.location}</Text>
              </Col>
              <Col style={styles.column3}>
                <Text style={styles.row_text}>${order.data.amount}</Text>
              </Col>
              <Col style={styles.column3}>
                <Text style={styles.row_text}>{order.data.score_change}</Text>
              </Col>
            </Row>
          ))}
        </Grid>
      </KeyboardAvoidingView>
    );
  }
  else if (buttons == 1) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>History</Text>

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
            <Text>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(1);
            }}
            style={[
              buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text>Energy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(2);
            }}
            style={[
              buttons == 2 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text>Transport</Text>
          </TouchableOpacity>
        </View>

        <Grid style={styles.table}>
          <Row style={styles.header_row}>
            <Col style={styles.column2}>
              <Text style={styles.header_text}>Date</Text>
            </Col>
            <Col style={styles.column2}>
              <Text style={styles.header_text}>Item</Text>
            </Col>
            <Col style={styles.column4}>
              <Text style={styles.header_text}>Amount</Text>
            </Col>
            <Col style={styles.column4}>
              <Text style={styles.header_text}>Karma</Text>
            </Col>
          </Row>

          {energyOrders.map((order) => (
            <Row style={styles.row} key={order.id}>
              <Col style={styles.column2}>
                <Text style={styles.row_text}>{order.data.date}</Text>
              </Col>
              <Col style={styles.column2}>
                <Text style={styles.row_text}>{order.data.energy}</Text>
              </Col>
              <Col style={styles.column4}>
                <Text style={styles.row_text}>{order.data.amount} kWh</Text>
              </Col>
              <Col style={styles.column4}>
                <Text style={styles.row_text}>{order.data.score_change}</Text>
              </Col>
            </Row>
          ))}
        </Grid>
      </KeyboardAvoidingView>
    );
  }
  else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>History</Text>

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
            <Text>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(1);
            }}
            style={[
              buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text>Energy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButtons(2);
            }}
            style={[
              buttons == 2 ? styles.buttonSelected : styles.buttonNotSelected,
            ]}
          >
            <Text>Transport</Text>
          </TouchableOpacity>
        </View>

        <Grid style={styles.table}>
          <Row style={styles.header_row}>
            <Col style={styles.column2}>
              <Text style={styles.header_text}>Date</Text>
            </Col>
            <Col style={styles.column2}>
              <Text style={styles.header_text}>Item</Text>
            </Col>
            <Col style={styles.column4}>
              <Text style={styles.header_text}>Distance</Text>
            </Col>
            <Col style={styles.column4}>
              <Text style={styles.header_text}>Karma</Text>
            </Col>
          </Row>

          {transportOrders.map((order) => (
            <Row style={styles.row} key={order.id}>
              <Col style={styles.column2}>
                <Text style={styles.row_text}>{order.data.date}</Text>
              </Col>
              <Col style={styles.column2}>
                <Text style={styles.row_text}>{order.data.method}</Text>
              </Col>
              <Col style={styles.column4}>
                <Text style={styles.row_text}>{order.data.mileage} miles</Text>
              </Col>
              <Col style={styles.column4}>
                <Text style={styles.row_text}>{order.data.score_change}</Text>
              </Col>
            </Row>
          ))}
        </Grid>
      </KeyboardAvoidingView>
    );
  }
};

export default HistoryScreen

// Screen styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    marginTop: "20%",
    fontWeight: "400",
    fontSize: 25,
    color: "black",
  },
  buttonContainer: {
    marginTop: "5%",
    flexDirection: "row",
    marginBottom: "5%",
  },
  buttonSelected: {
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    backgroundColor: "#b9b9b9",
    marginRight: "3%",
    marginLeft: "3%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonNotSelected: {
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    marginRight: "3%",
    marginLeft: "3%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    color: "black",
    borderColor: "black",
  },
  header_row: {
    height: 23,
    fontSize: 30,
    width: "100%",
  },
  row: {
    height: 17,
  },
  row_text: {
    fontSize: 12,
    color: "black",
  },
  header_text: {
    fontSize: 15,
    color: "black",
    textDecorationLine:'underline',
  },
  column1: {
    width: "20%",
  },
  column2: {
    width: "25%",
  },
  column3: {
    width: "17%",
    alignItems:'center',
  },
  column4: {
    width: "25%",
    alignItems:'center',
  },
});
