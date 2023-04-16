import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { allowElectricityEntry } from "../score";
const BottomNav = () => {
  {/* For choosing which menu button to highlight */}
  const [buttons, setButtons] = useState(0);

  {/* For choosing whether to display addfood/transportation/energy icons or not */}
  const [topmenu, setTopMenu] = useState(false);

  const navigation = useNavigation();

  async function handleEnergyPress() {
    const diff = await allowElectricityEntry();
    if(diff == 0) {
      setButtons(5);
      navigation.navigate("AddEnergy");
      setTopMenu(!topmenu);
    }
    else {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hours = Math.floor(diff / (60 * 60 * 1000)) % 24;
      const minutes = Math.floor(diff  / (60 * 1000)) % 60;
      const seconds = Math.floor(diff / 1000) % 60;
      alert("You need to wait\n" + 
        `${days}d ${hours}h ${minutes}m ${seconds}s\n` + 
        "before making new energy entry" );
    }
    
  }

  return (
    <View style={styles.navContainer} >
      <View style={[topmenu == true ? styles.topMenuSelected : styles.topMenuNotSelected]} >
        {/* Buttons to navigate to different add screens */}
        <TouchableOpacity onPress={() => {setButtons(4); navigation.navigate("AddFood"); setTopMenu(!topmenu)}}
          style={[buttons == 4 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/carrot.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEnergyPress}
          style={[buttons == 5 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/energy.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setButtons(6); navigation.navigate("AddTransportation"); setTopMenu(!topmenu)}}
          style={[buttons == 6 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/bus2.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMenu} >
        {/* Buttons to navigate to different non-add screens */}
        <TouchableOpacity onPress={() =>{setButtons(0); setTopMenu(false); navigation.navigate("Homepage")}}
          style={[buttons == 0 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/home.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setButtons(1); setTopMenu(false); navigation.navigate("Leaderboard")}}
          style={[buttons == 1 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/leaderboard.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setTopMenu(!topmenu)}}
          style={styles.buttonNotSelected}>
          <Image style={styles.image} source={require('../assets/add.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setButtons(2); setTopMenu(false); navigation.navigate("History")}}
          style={[buttons == 2 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/history.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setButtons(3); setTopMenu(false); navigation.navigate("Settings")}}
          style={[buttons == 3 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/settings.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNav;

// Screen styling
const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "12%",
    width: "101%",
    position: "absolute",
    bottom: 0,
  },
  topMenuSelected: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    position: "absolute",
    bottom: "50%",
    width: "40%",
  },
  topMenuNotSelected: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "0%",
    position: "absolute",
    bottom: 0,
  },
  bottomMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    backgroundColor: "white",
    borderWidth: 1,
    width: "101%",
    position: "absolute",
    bottom: 0,
  },
  image: {
    width: 30,
    height: "80%",
    resizeMode: "contain",
  },
  buttonSelected: {
    color: "black",
    backgroundColor: "#b9b9b9",
    marginRight: "5%",
    marginLeft: "5%",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonNotSelected: {
    marginRight: "5%",
    marginLeft: "5%",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
