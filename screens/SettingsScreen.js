import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Image, Modal } from "react-native";
import { React, useState, useContext } from 'react';
import styles from "./styles/AuthStyle";
import { Divider } from "@rneui/themed";
import { Formik } from "formik";
import { Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { UpdatePass, auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { UpdateEmail, UpdateLoc } from "../config/firebase";
import * as Yup from "yup";

import { AuthContext } from "../AuthContext";

const ChangeSchema = Yup.object().shape({
  new_email: Yup.string().email("Invalid email").required("Required"),
  new_password: Yup.string()
    .min(8)
    .required("Required")
    .matches(
      // Regex for strong password validation
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_]).{8,}$/,
      "Must contain minimum 8 characters, at least one uppercase letter, one number and one special character"
    ),
  confirm_new_password: Yup.string()
    .min(8)
    .oneOf([Yup.ref("new_password")], "Your passwords do not match.")
    .required("Required"),
});

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

  const { logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        logOut();
        console.log("Sign out successfully");
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

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
        <Text style = {styles.settingText}>Change Avatar</Text>
      </View>

      <TouchableOpacity
        onPress={() => setmodalLocOpen(true)}>
        <Text style = {styles.settingText}>Change Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setmodalPassOpen(true)}>
        <Text style = {styles.settingText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setmodalEmailOpen(true)}>
        <Text style = {styles.settingText}>Change Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => 
          signOut(auth)
          .then(() => {
            console.log('The User Signed Out.')
            handleLogOut()
          })}>
        <Text style = {styles.settingText}>Log Out</Text>
      </TouchableOpacity>

      {/* Modal for changing the user location */}
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
                UpdateLoc(value)
              }}/>
          </View>

        </View>
      </Modal>

      {/* Modal for changing the user password */}
      {/* onSubmit does not work. Worked before. Reauth for password is not set. */}
      <Modal
        visible = {modalPassOpen}
        animationType = "slide">
        <View style = {styles.container}>
          <Formik
                  initialValues={{ new_password: '',
                                  confirm_new_password: '' }}
                  onSubmit={(values) => {console.log(values)
                              alert('The password has changed.')
                              setmodalPassOpen(false)
                              UpdatePass(values.new_password)}}
                  validationSchema={ChangeSchema}
              >
                  {({values,
                      touched,
                      errors,
                      handleSubmit,
                      handleChange,
                      setFieldTouched}) => (
                      <View>
                          <Text style = {styles.labelText}>Enter New Password: </Text>

                          <TextInput
                              style = {styles.input}
                              placeholder = 'New Password'
                              onChangeText={handleChange('new_password')}
                              value={values.new_password}
                              onBlur={() => setFieldTouched("new_password")}
                              autoCapitalize={false}
                              secureTextEntry={true}
                          />
                          {touched.new_password && errors.new_password && (
                              <Text style={styles.errorText}>{errors.new_password}</Text>
                          )}

                          <Text style={styles.labelText}>Confirm New Password:</Text>
                          <TextInput
                              style={styles.input}
                              placeholder="Confirm Password"
                              value={values.confirm_new_password}
                              onChangeText={handleChange("confirm_new_password")}
                              onBlur={() => setFieldTouched("confirm_new_password")}
                              autoCapitalize={false}
                              secureTextEntry={true}
                          />
                          {touched.confirm_new_password && errors.confirm_new_password && (
                              <Text style={styles.errorText}>{errors.confirm_new_password}</Text>
                          )}

                          <Button
                              title="Change Password"
                              onPress={handleSubmit}
                          />
                      </View>
                  )}
              </Formik>
          <Button
            title="close pass"
            onPress={() => setmodalPassOpen(false)}
          />
        </View>
      </Modal>


      {/* Modal for changing the user email */}
      <Modal
        visible = {modalEmailOpen}
        animationType = "slide">
        <View style = {styles.container}>
            <Formik
                initialValues={{ new_email: '',
                                confirm_new_email: '' }}
                onSubmit={(values) => {console.log(values.new_email)
                    alert('The email has changed.')
                    UpdateEmail(values.new_email)
                    setmodalEmailOpen(false)}}
            >
                {({values,
                    handleSubmit,
                    handleChange,
                    setFieldTouched}) => (
                    <View>
                        <Text style = {styles.labelText}>Enter New Email: </Text>

                        <TextInput
                            style = {styles.input}
                            placeholder = 'New Email'
                            onChangeText={handleChange('new_email')}
                            value={values.new_email}
                            onBlur={() => setFieldTouched("new_email")}
                            autoCapitalize={false}
                        />

                        <Text style={styles.labelText}>Confirm New Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Email"
                            value={values.confirm_new_email}
                            onChangeText={handleChange("confirm_new_email")}
                            onBlur={() => setFieldTouched("confirm_new_email")}
                            autoCapitalize={false}
                        />

                        <Button
                            title="Change Email"
                            onPress={handleSubmit}
                        />
                    </View>
                )}
            </Formik>
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
        <Text style = {styles.settingText}>About Us</Text>
      </View>

      <View>
        <Text style = {styles.settingText}>Contact Support</Text>
      </View>

    </KeyboardAvoidingView>
  );
};

export default SettingsScreen