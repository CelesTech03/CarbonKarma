import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState, useCallback, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";
import { addEnergyEntry } from "../config/firebase";
import { getStoredScore, getStoredVal, electricityVal, allowElectricityEntry } from "../score";

{/* Screen contains a dropdown menu for item type and purchase location. A third-party library, React Native Dropdown Picker, was
used for this and its proper usage is documented at https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage

Screen also contains a slider for setting purchase amounts. A third-party library, react-native-slider, was
used for this and its proper usage is documented at https://github.com/miblanchard/react-native-slider */}

const AddEnergyScreen = () => {
  {/* For opening and closing energy dropdown menus and saving value of chosen energy type e.g. when openEnergy
is true, the food dropdown menu is open. Possible values of valueEnergy are "Gas" or "Electricity". valueEnergy
is sent to score.js to calculate score changes. */}
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

  {/* Sets setting minimum energy amount on slider */}
  const [minAmount, setMinAmount] = useState(1);

  {/* Sets setting maximum energy amount on slider */}
  const [maxAmount, setMaxAmount] = useState(500);
  const [allow, setAllow] = useState('none');
  const [time, setTime] = useState(null);

  {/* Calls on addEnergyEntry() function from firebase.js to create Firestore entry. Also calls on electricityVal()
function from score.js to calculate the resulting score change and update the user's score accordingly. */}
  async function submitHandler() {
    if (valueEnergy != "" && valueEnergy != null) {
      const score_change = await electricityVal('NYC', amount); // update current score
      
      // construct current date as a parameter to add to Firestore database
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const date = month + '/' + day + '/' + year;

      addEnergyEntry(amount, valueEnergy, date, score_change); // add to database
      alert("Energy score change: " + score_change);

      isAllow(valueEnergy);

      console.log("AddEnergyScreen.js: Energy:", valueEnergy);
      console.log("AddEnergyScreen.js: Amount:", amount);
      console.log("AddEnergyScreen.js: Score change:", score_change);
      console.log("AddEnergyScreen.js: Current score", await getStoredScore());
      console.log("AddEnergyScreen.js: Val Summary", await getStoredVal());
    }
    else {
      alert("Invalid entry");
      console.log("AddEnergyScreen.js: Values not set");
    }
  }

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
          "before making new energy entry");
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
        <View style={[{display: allow}, styles.block]}>
          <Text style={{lineHeight: 20, fontSize: 15}}>{time}</Text>
        </View>
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