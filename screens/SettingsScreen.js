import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Image, Modal } from "react-native";
import { React, useState } from 'react';
import styles from "./styles/AuthStyle";
import { Divider } from "@rneui/themed";
import PassForm from "../components/ChangePassForm";
import EmailForm from "../components/ChangeEmailForm";
import { Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const SettingsScreen = ({ navigation }) =>  {

  const [modalLocOpen, setmodalLocOpen] = useState(false)
  const [modalPassOpen, setmodalPassOpen] = useState(false)
  const [modalEmailOpen, setmodalEmailOpen] = useState(false)

  const [value, setValue] = useState(null)
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([
      {label: 'Brooklyn', value: 'Brooklyn'},
      {label: 'Bronx', value: 'Bronx'},
      {label: 'Queens', value: 'Queens'},
      {label: 'New York City', value: 'New York City'},
      {label: 'Staten Island', value: 'Staten Island'}
  ])

  return (
    <KeyboardAvoidingView style={styles.settingContainer} behavior = "padding">
      <Text style = {styles.settingTitle}>Settings</Text>

      <Image 
        source = {require('../assets/gear.png')}
        style = {styles.image}
      />    

      <Divider
        style={{ width: "90%", margin: 20 }}
        color="#fffff"
        insetType="middle"
        subHeaderStyle={{}}
        width={3}
        orientation="horizontal"
      />

      <Text style = {styles.settingHeading}>My Account</Text>

      <View>
        <Text>Change Avatar</Text>
      </View>

      <TouchableOpacity
        onPress={() => setmodalLocOpen(true)}>
        <Text>Change Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setmodalPassOpen(true)}>
        <Text>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setmodalEmailOpen(true)}>
        <Text>Change Email</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Log Out</Text>
      </TouchableOpacity>

      <Modal
        visible = {modalLocOpen}
        animationType = "slide">
        <View style = {styles.container}>
          <Text style = {styles.text}>Where do you live now?</Text>
    
          <View>
            <DropDownPicker
              open = {open}
              items = {items}
              value = {value}
              setItems = {setItems}
              setOpen = {setOpen}
              setValue = {setValue}
              placeholder = 'Select City: '
              onChangeValue = {(value) => {
                console.log(value)
                setmodalLocOpen(false)
              }}/>
          </View>
          {/* <Button
            title="close loc"
            onPress={() => setmodalLocOpen(false)}
          /> */}
        </View>
      </Modal>

      <Modal
        visible = {modalPassOpen}
        animationType = "slide"
        onRequestClose={() => setmodalPassOpen(false)}>
        <View style = {styles.container}>
          <PassForm/>
          <Button
            title="close pass"
            onPress={() => setmodalPassOpen(false)}
          />
        </View>
      </Modal>

      <Modal
        visible = {modalEmailOpen}
        animationType = "slide"
        onRequestClose={() => setmodalEmailOpen(false)}>
        <View style = {styles.container}>
          <EmailForm/>
          <Button
            title="close email"
            onPress={() => setmodalEmailOpen(false)}
          />
        </View>
      </Modal>

      <Divider
        style={{ width: "90%", margin: 20 }}
        color="#fffff"
        insetType="middle"
        subHeaderStyle={{}}
        width={3}
        orientation="horizontal"
      />

      <Text style = {styles.settingHeading}>Help</Text>

      <View>
        <Text>About Us</Text>
      </View>

      <View>
        <Text>Contact Support</Text>
      </View>

    </KeyboardAvoidingView>
  );
};

export default SettingsScreen