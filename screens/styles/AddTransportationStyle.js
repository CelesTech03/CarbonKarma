import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '400',
        fontSize: 35,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    image: {
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        resizeMode: 'contain',
        width: 150,
        height: 150,
        marginBottom: 20,
        backgroundColor: 'white'
    },
    dropDownContainer: {
        width: '80%',
        zIndex: 100,
    },
    sliderContainer: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: '10%',
        marginBottom: '10%',
        backgroundColor: 'white'
    },
    sliderText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        fontSize: 15,
    },
    sliderTextInput: {
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        width: '30%',
        textAlign: 'center',
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        width: '50%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    submissionResult: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})