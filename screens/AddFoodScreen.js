import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";
import { modifyUserDocument } from "../config/firebase";
import { addFoodOrder } from "../config/firebase";

const AddFoodScreen = () => {
  { /* For opening and closing food dropdown menus and saving value of chosen food */ }
  const [openFood, setOpenFood] = useState(false);
  const [valueFood, setValueFood] = useState(null);

  { /* For opening and closing loc dropdown menus and saving value of chosen loc */ }
  const [openLoc, setOpenLoc] = useState(false);
  const [valueLoc, setValueLoc] = useState(null);

  const onOpenFood = useCallback(() => {
    setOpenLoc(false);
  }, []);

  const onOpenLoc = useCallback(() => {
    setOpenFood(false);
  }, []);

  { /* Lists for dropdown menus */ }
  const meat = [
    { label: "Select an item", value: "" },
    { label: "Chicken", value: "chicken" },
    { label: "Pork", value: "pork" },
    { label: "Beef", value: "beef" },
    { label: "Fish", value: "fish" },
  ];
  const veg = [
    { label: "Select an item", value: "" },
    { label: "Carrot", value: "carrot" },
    { label: "Tomato", value: "tomato" },
    { label: "Potato", value: "potato" },
    { label: "Other", value: "other" },
  ];
  const dairy = [
    { label: "Select an item", value: "" },
    { label: "Milk", value: "milk" },
    { label: "Cheese", value: "cheese" },
    { label: "Yogurt", value: "yogurt" },
    { label: "Other", value: "other" },
  ];

  const location = [
    { label: "Select a location", value: "" },
    { label: "Farmer's market", value: "farmer" },
    { label: "Local grocery store", value: "local" },
    { label: "Large national chain", value: "chain" },
  ];

  { /* For choosing which dropdown list to display; default is 'meat' for Meat list; set to 'veg' for Vegs list; set to 'dairy' for Dairy list */ }
  const [items, setItems] = useState(meat);

  { /* For choosing which button to highlight; default is 0 for Meat button; set to 1 for Vegs; set to 2 for Dairy */ }
  const [buttons, setButtons] = useState(0);

  { /* For updating food amounts on slider */ }
  const [amount, setAmount] = useState(1);

  { /* For updating food amounts on slider */ }
  const [minAmount, setMinAmount] = useState(1);

  { /* For updating food amounts on slider */ }
  const [maxAmount, setMaxAmount] = useState(30);

  async function submitHandler() {
    if (
      valueFood != "" &&
      valueLoc != "" &&
      valueFood != null &&
      valueLoc != null
    ) {
      console.log("AddFoodScreen.js: Food:", valueFood);
      console.log("AddFoodScreen.js: Location:", valueLoc);
      amount[0] != undefined
        ? console.log("AddFoodScreen.js: Amount:", amount[0])
        : console.log("AddFoodScreen.js: Amount:", amount);
      // modifyUserDocument({ valueFood, valueLoc, amount });
      addFoodOrder(amount, valueFood, valueLoc);
    } else console.log("AddFoodScreen.js: Values not set");
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
          }}
          style={[
            buttons == 0 ? styles.buttonSelected : styles.buttonNotSelected,
          ]}
        >
          <Text>Meat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setItems(veg);
            setValueFood("");
            setValueLoc("");
            setButtons(1);
            setAmount(1);
            setMaxAmount(20);
          }}
          style={[
            buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected,
          ]}
        >
          <Text>Vegs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setItems(dairy);
            setValueFood("");
            setValueLoc("");
            setButtons(2);
            setAmount(1);
            setMaxAmount(15);
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
          onChangeValue={(value) => {
            //console.log("AddFoodScreen.js: Food:", value)
          }}
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
          onChangeValue={(value) => {
            //console.log("AddFoodScreen.js: Location:", location)
          }}
        />
      </View>

      {/* Slider for food entry */}
      <View style={styles.sliderContainer}>
        <Slider
          value={amount}
          onValueChange={(amount) => setAmount(amount)}
          minimumValue={minAmount}
          maximumValue={maxAmount}
          step={1}
        />
        <Text>Amount: {amount} lbs</Text>
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
