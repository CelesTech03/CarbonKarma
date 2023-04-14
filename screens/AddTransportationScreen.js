import {KeyboardAvoidingView, TextInput, Text, View, Image, TouchableOpacity, Modal} from "react-native";
import React, { useState } from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";
import styles from "./styles/AddTransportationStyle";
import{vehicle_type, transVal} from "../score";

const AddTransportationScreen = () => {
    //values for dropdown
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)

    const methods = []
    vehicle_type.forEach(vehicle => methods.push({
        label: vehicle,
        value: vehicle}));

    const [method, setMethod] = useState(methods);

    //values for slider
    const [mileage, setMileage] = useState(0)
    const maxMileage = 1000;

    const [adjust, setAdjust] = useState(null);
    const [submitText, setSubmitText] = useState('Submit');
    const onSubmit = async () => {
        setSubmitText("Submitting...");

        //update transportation value and score stored in the local storage
        //set the adjustment value that will be displayed after submission
        setAdjust(await transVal(value, mileage)); 

        //reset the screen after submission
        setMileage(0);
        setValue(null);
        setModalVisible(true);
        setSubmitText("Submit");
    }
    
    //values for submission result modal
    const [modalVisible, setModalVisible] = useState(false)

    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Add Transportation</Text>

            <Image 
                style={styles.image}
                source={require("../assets/bus.png")}/>

            {/* dropdown to select the types of vehicles */}
            <View style={styles.dropDownContainer}>
                <DropDownPicker 
                    style={styles.dropdown}
                    open={open}
                    value={value}
                    items={method}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setMethod}
                    maxHeight={200} />
            </View>

            {/* Input mileage with either slider or text input */}
            <KeyboardAvoidingView style={styles.sliderContainer}>
                <View style={styles.sliderText}>
                    <TextInput 
                        keyboardType= {"numeric"}
                        multiline={false}
                        inputMode = {'numeric'}
                        value={String(mileage)}
                        onChangeText={value => setMileage(value)}
                        style={styles.sliderTextInput} />
                    <Text>miles</Text>
                </View>
                <Slider
                    value={mileage}
                    step={1}
                    onValueChange={value => setMileage(value)}
                    maximumValue={maxMileage} />
            </KeyboardAvoidingView>

            <TouchableOpacity 
                style={styles.button}
                onPress={onSubmit}>
                <Text>{submitText}</Text>
            </TouchableOpacity>

            {/* display the result of the submission */}
            <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.submissionResult}>
                        <Text style={styles.title}>Submission Success!</Text>
                        <Text style={styles.title}>The cost value is {adjust}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(false)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>  
            </Modal>
        </View>
    )
}

export default AddTransportationScreen