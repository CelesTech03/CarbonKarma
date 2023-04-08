import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from "react-native";
import { React, useState } from 'react';
import styles from "./styles/OnboardStyles";
import { UpdateSolar } from "../config/firebase";

const FirstSolar = () => {
    const [solar, setSolar] = useState(null)

    async function submitSolarHandler() {
      if (solar != null) {
        console.log("Solar: ", solar)
        UpdateSolar(solar);
      } else 
          console.log("Solar is not updated.");
    }

    return (
      <View>
      <View>
        <Text style = {styles.heading}>First Time Users</Text>
      </View>

        <Text style = {styles.text}>Do you have a solar panel?</Text>


        <View style = {styles.buttonContainer}>
            <TouchableOpacity
            style = {styles.button}
            onPress={() => {
              setSolar('Yes')
              submitSolarHandler(solar)
              }}>
                <Text style = {styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {styles.button}
            onPress={() => {
              setSolar('No')
              submitSolarHandler(solar)
              }}>
                <Text style = {styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>

        {/*Bottom Nav buttons here */}
        <View style = {styles.bottomRow}>
          <Text style = {styles.bottomLine}>
            _____________________________________________________
          </Text>
          <TouchableOpacity
            style = {styles.Backbutton}
            activeOpacity = {0.5}>
              {/* <Image
              source = {'../assets/back.png'}
              style = {styles.buttonIcon}/> */}
              <Text style = {styles.bottomRightText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {styles.Nextbutton}
            activeOpacity = {0.5}>
              {/* <Image
              source = {'../assets/right-arrow.png'}
              style = {styles.buttonIcon}/> */}
              <Text style = {styles.bottomLeftText}>Next</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
}

export default FirstSolar

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding:24
//     },
//     heading: {
//       fontWeight: '400',
//       fontSize: 30,
//       color: 'black',
//       padding: 60
//     },
//     text: {
//       fontSize: 16,
//       marginLeft: '30%',
//       marginBottom: 20
//     },
//     Backbutton: {
//         left: 10,
//         margin: 5,
//         borderWidth: 0.5,
//         height: 40
//     },
//     Nextbutton: {
//         right: 10,
//         margin: 5,
//         borderWidth: 0.5,
//         height: 40
//     },
//     buttonIcon: {
//         padding: 10,
//         margin: 5,
//         height: 25,
//         width:25
//     },
//     buttonContainer: {
//       width: "60%",
//       justifyContent: "center",
//       alignItems: "center",
//       marginTop: 40,
//     },
//     button: {
//       backgroundColor: "seagreen",
//       width: "100%",
//       padding: 15,
//       borderRadius: 10,
//       alignItems: "center",
//     }
//   })