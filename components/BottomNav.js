import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const BottomNav = () => {
  {/* For choosing which menu button to highlight */}
  const [buttons, setButtons] = useState(0);

  {/* For choosing whether to display addfood/transportation/energy icons or not */}
  const [topmenu, setTopMenu] = useState(false);

  {/* Navigation object used to move between different screens when menu icons are pressed */}
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer} >
      <View style={[topmenu == true ? styles.topMenuSelected : styles.topMenuNotSelected]} >
        {/* Buttons to navigate to AddFood/Energy/Transportation screens. Buttons are normally hidden
            unless middle "+" icon is pressed (i.e. unless topmenu == true).*/}
        <TouchableOpacity onPress={() => {setButtons(4); navigation.navigate("AddFood"); setTopMenu(!topmenu)}}
          style={[buttons == 4 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/carrot.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setButtons(5); navigation.navigate("AddEnergy"); setTopMenu(!topmenu)}}
          style={[buttons == 5 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/energy.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setButtons(6); navigation.navigate("AddTransportation"); setTopMenu(!topmenu)}}
          style={[buttons == 6 ? styles.buttonSelected : styles.buttonNotSelected]}>
          <Image style={styles.image} source={require('../assets/bus2.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomMenu} >
        {/* Buttons to navigate to all other non-add screens */}
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
