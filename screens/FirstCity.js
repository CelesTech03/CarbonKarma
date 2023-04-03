import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { React, useState } from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import { UpdateCity } from "../config/firebase";

const FirstCity = () => {
    {/* Set Up for City dropper */}
    const [value, setValue] = useState(null)
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([
        {label: 'Brooklyn', value: 'Brooklyn'},
        {label: 'Bronx', value: 'Bronx'},
        {label: 'Queens', value: 'Queens'},
        {label: 'New York City', value: 'New York City'},
        {label: 'Staten Island', value: 'Staten Island'}
    ])

    async function submitCityHandler() {
      if (value != null) {
        console.log("Address: ", city)
        UpdateCity(value);
      } else 
          console.log("City is not updated.");
    }

    return (
        <View style = {styles.container}>
          <Text style = {styles.heading}>First-Time Users</Text>
        
              <View>
                <Text style = {styles.text}>Where do you live?</Text>
          
                <View>
                  <DropDownPicker
                    open = {open}
                    items = {items}
                    value = {value}
                    setItems = {setItems}
                    setOpen = {setOpen}
                    setValue = {setValue}
                    placeholder = 'Select City: '
                    onChangeValue = {() => {
                      submitCityHandler()
                    }}/>
                </View>
    
              </View>

              {/*Bottom Nav buttons here */}
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
    )
}

export default FirstCity

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
    }
  })