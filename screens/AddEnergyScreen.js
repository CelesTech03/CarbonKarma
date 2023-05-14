import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";
import { addEnergyEntry } from "../config/firebase";
import { getStoredScore, getStoredVal, electricityVal } from "../score";

const AddEnergyScreen = () => {
  {/* For opening and closing energy dropdown menus and saving value of chosen energy type */}
  const [openEnergy, setOpenEnergy] = useState(false);
  const [valueEnergy, setValueEnergy] = useState(null);

  {/* Lists for energy dropdown menu */}
  const energy =[
    {label: 'Select an item', value: ''},
    {label: 'Gas', value: 'Gas'},
    {label: 'Electricity', value: 'Electricity'},
  ];

  {/* For updating energy amounts on slider */}
  const [amount, setAmount] = useState(1);

  {/* For updating energy amounts on slider */}
  const [minAmount, setMinAmount] = useState(1);

  {/* For updating energy amounts on slider */}
  const [maxAmount, setMaxAmount] = useState(500);

  async function submitHandler() {
    if (valueEnergy != "" && valueEnergy != null) {
      const score_change = await electricityVal('NYC', amount); // update current score
      
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const date = month + '/' + day + '/' + year;

      addEnergyEntry(amount, valueEnergy, date, score_change); // add to database

      console.log("AddEnergyScreen.js: Energy:", valueEnergy);
      console.log("AddEnergyScreen.js: Amount:", amount);
      console.log("AddEnergyScreen.js: Score change:", score_change);
      alert("Energy score change: " + score_change);
      console.log("AddEnergyScreen.js: Current score", await getStoredScore());
      console.log("AddEnergyScreen.js: Val Summary", await getStoredVal());
    }
    else
      console.log("AddEnergyScreen.js: Values not set");
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Add Energy Item</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/energy.png')}/>
      </View>

      {/* Drop-down menu for energy entry */}
      <View style={styles.dropdownContainer}>
        <DropDownPicker
        placeholder="Select an item"
        open={openEnergy}
        value={valueEnergy}
        zIndex={2000}
        zIndexInverse={1000}
        items={energy}
        setOpen={setOpenEnergy}
        setValue={setValueEnergy}
        onChangeValue={(value) => {
          //console.log("AddEnergyScreen.js: Energy:", value)
        }}
        />
      </View>

      {/* Slider for energy entry */}
      <View style={styles.sliderContainer}>
        <Slider
          value={amount}
          onValueChange={amount => setAmount(amount)}
          minimumValue={minAmount}
          maximumValue={maxAmount}
          step={1}
        />
        <Text>Amount: {amount} kWh</Text>
      </View>

      {/* Button to submit energy entry */}
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={() => { submitHandler() }} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddEnergyScreen;

// Screen styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  title: {
    marginTop: "-16.5%",
    fontWeight: "400",
    fontSize: 35,
    color: "black",
    marginBottom: 10,
  },
  imageContainer: {
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    borderRadius: 100,
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  dropdownContainer: {
    marginTop: "7%",
    width: "80%",
    zIndex: 100,
  },
  sliderContainer: {
    marginTop: "7%",
    width: "70%",
  },
  submitContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7%",
  },
  submitButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: "40%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
});