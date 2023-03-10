import {KeyboardAvoidingView, TextInput, Text, View, Image, TouchableOpacity, Modal} from "react-native";
import React, { useState } from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "@miblanchard/react-native-slider";
import styles from "./styles/AddTransportationStyle";

const AddTransportationScreen = () => {
    //values for dropdown
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [method, setMethod] = useState([
        {label: "Bus/Train", value: "bus_train"},
        {label: "Car", value: "car"},
        {label: "Walk/bike", value: "walk_bike"}
    ])

    //values for slider
    const [mileage, setMileage] = useState(0)
    const maxMileage = 10000

    const onSubmit = () => {
        setMileage(0)
        setValue(null)
        setModalVisible(true)
    }
    
    //values for submission result modal
    const [modalVisible, setModalVisible] = useState(false)
    const score = 500

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
                <Text>Submit</Text>
            </TouchableOpacity>

            {/* display the result of the submission */}
            <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.submissionResult}>
                        <Text style={styles.title}>Submission Success!</Text>
                        <Text style={styles.title}>Your new score is {score}</Text>
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