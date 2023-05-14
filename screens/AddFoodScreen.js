import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";
import { addFoodOrder } from "../config/firebase";
import { foodVal, getStoredScore, getStoredVal } from "../score";

{/* Screen contains a dropdown menu for item type and purchase location. A third-party library, React Native Dropdown Picker, was
used for this and its proper usage is documented at https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage

Screen also contains a slider for setting purchase amounts. A third-party library, react-native-slider, was
used for this and its proper usage is documented at https://github.com/miblanchard/react-native-slider */}

const AddFoodScreen = () => {
  { /* For opening and closing food dropdown menus and saving value of chosen food e.g. when openFood
is true, the food dropdown menu is open. Possible values of valueFood are specific types of food such as
"chicken", "pork", "fruits", or "milk". valueFood is sent to score.js to calculate score changes. */ }
  const [openFood, setOpenFood] = useState(false);
  const [valueFood, setValueFood] = useState(null);

  { /* For opening and closing loc dropdown menus and saving value of chosen loc e.g. when openLoc
is true, the location dropdown menu is open. valueLoc is "Farmer's market" or "Grocery Store".
valueLoc is sent to score.js to calculate score changes. */ }
  const [openLoc, setOpenLoc] = useState(false);
  const [valueLoc, setValueLoc] = useState(null);

  { /* For saving whether user is currently on Meat, Plants, or Dairy tab. Possible values are "meat", "plants",
  or "dairy". This value is sent to score.js to determine how much the score changes when submitting an entry. */ }
  const [category, setCategory] = useState('meat');

  { /* When the food dropdown menu is opened, the location dropdown menu should be closed. */}
  const onOpenFood = useCallback(() => {
    setOpenLoc(false);
  }, []);

  { /* When the location dropdown menu is opened, the food dropdown menu should be closed. */}
  const onOpenLoc = useCallback(() => {
    setOpenFood(false);
  }, []);

  { /* Lists for dropdown menus */ }
  const meat = [
    { label: "Select an item", value: "" },
    { label: "Poultry", value: "Poultry" },
    { label: "Seafood", value: "Seafood" },
    { label: "Other", value: "Other meat" },
  ];
  const plant = [
    { label: "Select an item", value: "" },
    { label: "Grains", value: "Grains" },
    { label: "Vegetable", value: "Vegetables" },
    { label: "Fruit", value: "Fruits" },
  ];
  const dairy = [
    { label: "Select an item", value: "" },
    { label: "Milk", value: "Milk" },
    { label: "Cheese", value: "Cheese" },
  ];

  const location = [
    { label: "Select a location", value: "" },
    { label: "Farmer's market", value: "Farmer's market" },
    { label: "Grocery store", value: "Grocery store" },
  ];

  { /* For choosing which dropdown list to display; default is 'meat' for Meat list; set to 'veg' for Vegs list; set to 'dairy' for Dairy list */ }
  const [items, setItems] = useState(meat);

  { /* For choosing which button to highlight; default is 0 for Meat button; set to 1 for Vegs; set to 2 for Dairy */ }
  const [buttons, setButtons] = useState(0);

  { /* For setting food amounts on slider */ }
  const [amount, setAmount] = useState(1);

  { /* For setting minimum food amounts on slider */ }
  const [minAmount, setMinAmount] = useState(1);

  { /* For setting maximum amounts on slider */ }
  const [maxAmount, setMaxAmount] = useState(100);

  {/* Calls on addFoodEntry() function from firebase.js to create Firestore entry. Also calls on foodVal()
function from score.js to calculate the resulting score change and update the user's score accordingly. */}
  async function submitHandler() {
    if (
      valueFood != "" &&
      valueLoc != "" &&
      valueFood != null &&
      valueLoc != null
    ) {
      const score_change = await foodVal(category, valueFood, valueLoc, amount);
      
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const date = month + '/' + day + '/' + year;
      
      addFoodOrder(amount, valueFood, valueLoc, date, score_change);
      alert("Food score change: " + score_change);

      console.log("AddFoodScreen.js: Category:", category);
      console.log("AddFoodScreen.js: Food:", valueFood);
      console.log("AddFoodScreen.js: Location:", valueLoc);
      console.log("AddFoodScreen.js: Amount:", amount);
      console.log("AddFoodScreen.js: Score change:", score_change);
      console.log("AddFoodScreen.js: Current score", await getStoredScore());
      console.log("AddFoodScreen.js: Val Summary", await getStoredVal());
    }
    else {
      alert("Invalid entry");
      console.log("AddFoodScreen.js: Values not set");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Food Item</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/carrot2.png")} />
      </View>

      {/* Buttons to choose type of food */}
      <View style={styles.foodContainer}>
        <TouchableOpacity
          onPress={() => {
            setItems(meat);
            setValueFood("");
            setValueLoc("");
            setButtons(0);
            setAmount(1);
            setMaxAmount(30);
            setCategory('meat');
          }}
          style={[
            buttons == 0 ? styles.buttonSelected : styles.buttonNotSelected,
          ]}
        >
          <Text>Meat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setItems(plant);
            setValueFood("");
            setValueLoc("");
            setButtons(1);
            setAmount(1);
            setMaxAmount(20);
            setCategory('plants');
          }}
          style={[
            buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected,
          ]}
        >
          <Text>Plants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setItems(dairy);
            setValueFood("");
            setValueLoc("");
            setButtons(2);
            setAmount(1);
            setMaxAmount(15);
            setCategory('dairy');
          }}
          style={[
            buttons == 2 ? styles.buttonSelected : styles.buttonNotSelected,
          ]}
        >
          <Text>Dairy</Text>
        </TouchableOpacity>
      </View>

      {/* Drop-down menu for food entry */}
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          placeholder="Select an item"
          open={openFood}
          onOpen={onOpenFood}
          value={valueFood}
          zIndex={2000}
          zIndexInverse={1000}
          items={items}
          setOpen={setOpenFood}
          setValue={setValueFood}
          setItems={setItems}
        />
        <DropDownPicker
          style={{ marginTop: "1.5%" }}
          placeholder="Select a location"
          open={openLoc}
          onOpen={onOpenLoc}
          value={valueLoc}
          zIndex={1000}
          zIndexInverse={2000}
          items={location}
          setOpen={setOpenLoc}
          setValue={setValueLoc}
        />
      </View>

      {/* Slider for food entry */}
      <View style={styles.sliderContainer}>
        <Slider
          value={amount}
          onValueChange={amount => setAmount(amount)}
          minimumValue={minAmount}
          maximumValue={maxAmount}
          step={1}
        />
        <Text>Amount: ${amount}</Text>
      </View>

      {/* Button to submit food entry */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          onPress={() => {
            submitHandler();
          }}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddFoodScreen;

// Screen styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: "10%",
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
  foodContainer: {
    marginTop: "5%",
    flexDirection: "row",
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
