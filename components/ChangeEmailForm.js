import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Image, Modal } from "react-native";
import { React } from 'react';
import styles from "../screens/styles/AuthStyle";
import { Formik } from "formik";
import { Button } from "react-native";

const EmailForm = (props) => {

    return (
        <View>
            <Formik
                initialValues={{ new_email: '',
                                confirm_new_email: '' }}
                onSubmit={values => console.log(values)}
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
    )
}

export default EmailForm