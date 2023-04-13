import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { React, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { UpdateCity } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const FirstCity = () => {
  {
    /* Set Up for City dropper */
  }
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Brooklyn", value: "Brooklyn" },
    { label: "Bronx", value: "Bronx" },
    { label: "Queens", value: "Queens" },
    { label: "New York City", value: "New York City" },
    { label: "Staten Island", value: "Staten Island" },
  ]);

  async function submitCityHandler() {
    if (value != null) {
      console.log("Address: ", value);
      UpdateCity(value);
    } else console.log("City is not updated.");
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Where do you live?</Text>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            items={items}
            value={value}
            setItems={setItems}
            setOpen={setOpen}
            setValue={setValue}
            placeholder="Select City: "
            onChangeValue={() => {
              submitCityHandler();
            }}
          />
        </View>
      </View>

      {/*Bottom Nav buttons here */}
      <TouchableOpacity
        style={styles.Nextbutton}
        activeOpacity={0.5}
        onPress={() => navigation.navigate("FirstCar")}
      >
        <Image
          source={require("../assets/right-arrow.png")}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FirstCity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "400",
    fontSize: 35,
    color: "black",
    marginLeft: "5%",
    marginBottom: 10,
  },
  dropdownContainer: {
    marginTop: "7%",
    width: "80%",
    zIndex: 100,
  },
  Backbutton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    margin: 5,
    borderWidth: 0.5,
    height: 40,
  },
  Nextbutton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    margin: 5,
    borderWidth: 0.5,
    height: 40,
  },
  buttonIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
  },
});
