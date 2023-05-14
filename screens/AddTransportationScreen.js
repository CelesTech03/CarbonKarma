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

  const onSubmit = () => {
    setMileage(0);
    setValue(null);
    setModalVisible(true);
  };

  //values for submission result modal
  const [modalVisible, setModalVisible] = useState(false);
  const score = 500;

  async function submitTransportHandler() {
    if (value != null) {
      const score_change = await transVal(value, mileage);
      
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const date = month + '/' + day + '/' + year;

      addTransport(value, mileage, date, score_change);

      console.log("Method: ", value);
      mileage[0] != undefined
        ? console.log("Mileage: ", mileage[0])
        : console.log("Mileage: ", mileage);
      console.log("AddTransScreen.js: Score change:", score_change);
      alert("Transportation score change: " + score_change);
      console.log("AddTransScreen.js: Current score", await getStoredScore());
      console.log("AddTransScreen.js: Val Summary", await getStoredVal());
    } else console.log("Method is not set.");
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
            onChangeText={(value) => setMileage(value)}
            style={styles.sliderTextInput}
          />
          <Text>miles</Text>
        </View>
        <Slider
          value={mileage}
          step={1}
          onValueChange={(value) => setMileage(value)}
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
