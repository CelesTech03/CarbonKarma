import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState, useCallback, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";
import { addEnergyEntry } from "../config/firebase";
import { electricityVal, allowElectricityEntry } from "../score";

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

  {/* For setting the display of the overlay */}
  const [allow, setAllow] = useState('none');
  const [time, setTime] = useState(null);

  async function submitHandler() {
    if (valueEnergy != "" && valueEnergy != null) {
      const score_change = await electricityVal('NYC', amount); // update current score
      
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const date = month + '/' + day + '/' + year;

      await addEnergyEntry(amount, valueEnergy, date, score_change, Date.now()); // add to database

      isAllow(valueEnergy);

      console.log("AddEnergyScreen.js: Energy:", valueEnergy);
      console.log("AddEnergyScreen.js: Amount:", amount);
      console.log("AddEnergyScreen.js: Score change:", score_change);
      alert("Energy score change: " + score_change);
    }
    else
      console.log("AddEnergyScreen.js: Values not set");
  }

  //Checks if the user is allow to make an new electricity entry.
  //If allowed, the overlay will not be shown.
  //If not allowed, an overlay will be displayed with text telling
  //user the time the user needed to wait before making new submission.
  async function isAllow(val) {
    if(val == 'Electricity') {
      const diff = await allowElectricityEntry();
      if(diff == 0) {
        setAllow('none');
      }
      else {
        console.log('not allow');
        setAllow('flex');
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        const hours = Math.floor(diff / (60 * 60 * 1000)) % 24;
        const minutes = Math.floor(diff  / (60 * 1000)) % 60;
        const seconds = Math.floor(diff / 1000) % 60;
        setTime("You need to wait\n" + 
          `${days}d ${hours}h ${minutes}m ${seconds}s\n` + 
          "before making new electricity entry");
      }
    }
    else {
      setAllow('none');
    }
  }

  useEffect(() => {
    isAllow(valueEnergy);
  }, [valueEnergy])

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

      <View style={styles.inputContainer}>
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
        {/* Overlays for preventing user from making new submission */}
        {(valueEnergy == 'Electricity' || valueEnergy == 'Gas') ? (valueEnergy == 'Electricity') ?
          <>
            <View style={[{display: allow}, styles.block]}>
              <Text style={{lineHeight: 20, fontSize: 15, fontWeight: 'bold'}}>{time}</Text>
            </View>
          </> :
          <>
            <View style={styles.block}>
              <Text style={{lineHeight: 20, fontSize: 15, fontWeight: 'bold'}}>Coming Soon...</Text>
            </View>
          </> :
          <></>}
        
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
  inputContainer: {
    marginTop: "7%",
    width: "70%",
    alignItems: "center",
    justifyContent: 'center'
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
    width: '100%',
  },
  submitContainer: {
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  submitButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: "55%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
  block: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.9,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  }
});