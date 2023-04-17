import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Image, Modal } from "react-native";
import { React } from 'react';
import styles from "../screens/styles/AuthStyle";
import { Formik } from "formik";
import { Button } from "react-native";

const PassForm = (props) => {

    return (
        <View>
            <Formik
                initialValues={{ new_password: '',
                                confirm_new_password: '' }}
                onSubmit={values => console.log(values)}
            >
                {({values,
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

                        <Button
                            title="Change Password"
                            onPress={handleSubmit}
                        />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default PassForm