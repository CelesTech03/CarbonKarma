import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { React, useState } from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import { UpdateGas } from "../config/firebase";

const FirstGas = () => {
    {/* Set Up for Gas dropper */}
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState([
        {label: '0', value: '0'},
        {label: '5', value: '5'},
        {label: '10', value: '10'},
        {label: '15', value: '15'},
        {label: '20', value: '20'},
        {label: '25', value: '25'},
        {label: '30+', value: '30+'}
    ])

    async function submitGasHandler() {
      if (value != null) {
        console.log("Gas: ", gas)
        UpdateGas(value);
      } else 
          console.log("Gas is not updated.");
    }

    return (
        <View>
            <Text style = {styles.text}>How many gallons of gas do you use?</Text>
      
            <View>
              <DropDownPicker
                value = {value}
                items = {items}
                open = {open}
                setOpen = {setOpen}
                setValue = {setValue}
                setItems = {setItems}
                placeholder = '0'
                onChangeValue = {() => {
                  submitGasHandler(value)
                }}/>
            </View>

            {/*Bottom Nav buttons here */}
            <View style = {styles.buttonContainer}>
              <TouchableOpacity
                style = {styles.Backbutton}
                activeOpacity = {0.5}>
                  <Image
                  source = {'../assets/back.png'}
                  style = {styles.buttonIcon}/>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.Nextbutton}
                activeOpacity = {0.5}>
                  <Image
                  source = {'../assets/right-arrow.png'}
                  style = {styles.buttonIcon}/>
                </TouchableOpacity>
            </View>
          </View>
    )
}

export default FirstGas

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:24
    },
    heading: {
      fontWeight: '400',
      fontSize: 30,
      color: 'black',
      padding: 60
    },
    text: {
      fontSize: 16,
      marginLeft: '30%',
      marginBottom: 20
    },
    Backbutton: {
        left: 10,
        margin: 5,
        borderWidth: 0.5,
        height: 40
    },
    Nextbutton: {
        right: 10,
        margin: 5,
        borderWidth: 0.5,
        height: 40
    },
    buttonIcon: {
        padding: 10,
        margin: 5,
        height: 25,
        width:25
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "seagreen",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    }
  })