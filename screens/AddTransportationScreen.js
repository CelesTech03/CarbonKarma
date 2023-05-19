import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";
import styles from "./styles/AddTransportationStyle";
import { addTransport } from "../config/firebase";
import { getStoredScore, getStoredVal, transVal } from "../score";

const AddTransportationScreen = () => {
  //values for dropdown
  {/* For opening and closing transportation dropdown menus and saving value of chosen type e.g. when open is true,
  the transportation dropdown menu is open. Possible values of value are "Car", "Bus", or "Train". value is sent to
  score.js to calculate score changes. method is used to determine the contents of the dropdown menu. */}
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [method, setMethod] = useState([
    { label: "Car", value: "Car" },
    { label: "Bus", value: "Bus" },
    { label: "Train", value: "Train" },
    // { label: "Walk/bike", value: "walk_bike" },
  ]);

  //values for slider
  const [mileage, setMileage] = useState(0);

  const [warning, setWarning] = useState('none')

  const onSubmit = () => {
    setMileage(0);
    setValue(null);
    setModalVisible(true);
  };

  //values for submission result modal
  const [modalVisible, setModalVisible] = useState(false);
  const score = 500;
  
  {/* Calls on addTransport() function from firebase.js to create Firestore entry. Also calls on transVal()
  function from score.js to calculate the resulting score change and update the user's score accordingly. */}
  async function submitTransportHandler() {
    if (value != null && parseInt(mileage) > 0) {
      const score_change = await transVal(value, mileage);
      
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const date = month + '/' + day + '/' + year;

      addTransport(value, parseInt(mileage), date, score_change);
      alert("Transportation score change: " + score_change);

      console.log("Method: ", value);
      console.log("Mileage: ", parseInt(mileage));
      console.log("AddTransScreen.js: Score change:", score_change);
      console.log("AddTransScreen.js: Current score", await getStoredScore());
      console.log("AddTransScreen.js: Val Summary", await getStoredVal());
    }
    else {
      alert("Invalid entry");
      console.log("AddTransportationScreen.js: Method is not set.");
    }
  }

  function handleValueChange(value) {
    if(String(value).match("^[0-9]*$")) {
      setMileage(value);
      setWarning('none');
    }
    else {
      setWarning('flex');
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transportation</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/bus2.png")} />
      </View>

      {/* dropdown to select the types of vehicles */}
      <View style={styles.dropDownContainer}>
        <DropDownPicker
          style={styles.dropdown}
          open={open}
          value={value}
          items={method}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setMethod}
          maxHeight={200}
        />
      </View>

      {/* Input mileage with either slider or text input */}
      <KeyboardAvoidingView style={styles.sliderContainer}>
        <View style={styles.sliderText}>
          <TextInput
            keyboardType={"numeric"}
            multiline={false}
            inputMode={"numeric"}
            value={mileage.toString()}
            onChangeText={(value) => handleValueChange(value)}
            style={styles.sliderTextInput}
          />
          <Text>miles</Text>
        </View>
        <Text style={{color: 'red', display: warning}}>Please only input numbers 0 - 9!</Text>
        <Slider
          value={mileage}
          step={1}
          onValueChange={(value) => handleValueChange(value)}
          maximumValue={500}
        />
      </KeyboardAvoidingView>


      <TouchableOpacity
        style={styles.button}
        onPress={() => submitTransportHandler()}
      >
        <Text>Submit</Text>
      </TouchableOpacity>

      {/* display the result of the submission */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.submissionResult}>
          <Text style={styles.title}>Submission Success!</Text>
          <Text style={styles.title}>Your new score is {score}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AddTransportationScreen;
