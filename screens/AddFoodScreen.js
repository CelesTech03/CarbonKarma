import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";

const AddFoodScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const meat =[
    {label: 'Select an item', value: ''},
    {label: 'Chicken', value: 'chicken'},
    {label: 'Pork', value: 'pork'},
    {label: 'Beef', value: 'beef'},
    {label: 'Fish', value: 'fish'},
  ];
  const veg = [
    {label: 'Select an item', value: ''},
    {label: 'Carrot', value: 'carrot'},
    {label: 'Tomato', value: 'tomato'},
    {label: 'Potato', value: 'potato'},
    {label: 'Other', value: 'other'},
  ];
  const dairy = [
    {label: 'Select an item', value: ''},
    {label: 'Milk', value: 'milk'},
    {label: 'Cheese', value: 'cheese'},
    {label: 'Yogurt', value: 'yogurt'},
    {label: 'Other', value: 'other'},
  ];
  const [items, setItems] = useState(meat);
  const state = {value: 0,};

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Add Food Item</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/carrot.png')}/>
      </View>
      
      {/* Buttons to choose type of food */}
      <View style={styles.foodContainer}>
        <TouchableOpacity onPress={() => {setItems(meat); setValue('')}} style={styles.foodSideButton}>
          <Text >Meat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setItems(veg); setValue('')}} style={styles.foodMidButton}>
          <Text >Vegs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setItems(dairy); ; setValue('')}} style={styles.foodSideButton}>
          <Text >Dairy</Text>
        </TouchableOpacity>
      </View>
      
      {/* Drop-down menu for food entry */}
      <View style={styles.dropdownContainer}>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={(value) => {
          console.log(value);
        }}
        />
      </View>

      {/* Slider for food entry */}
      <View style={styles.sliderContainer}>
        <Slider
          value={state.value}
          onValueChange={value => this.setState({value})}
          minimumValue={0}
          maximumValue={10}
        />
        <Text>Value: {state.value}</Text>
      </View>

      {/* Button to submit food entry */}
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={() => { }} style={styles.submitButton}>
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
    marginTop: "20%",
    alignItems: "center",
  },
  title: {
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
  foodSideButton: {
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  foodMidButton: {
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    marginRight: "5%",
    marginLeft: "5%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    marginVertical: "7%",
    width: "80%",
  },
  sliderContainer: {
    width: "70%",
  },
  submitContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
