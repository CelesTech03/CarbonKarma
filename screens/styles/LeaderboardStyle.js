import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 40,
        color: 'green',
        fontWeight: 'bold',
        margin: 10,
    },
    title_container: {
        width: '100%',
        alignItems: 'center',
    },
    items_container: {
        width: '100%',
        marginBottom: 120,
    },
    image_container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    item_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 10,
        borderTopLeftRadius: 75,
        borderBottomLeftRadius: 75,
        marginRight: 15,
        borderLeftWidth: 5,
        borderTopWidth: 5,
        borderColor: '#92ECF6',
    },

    detail_container: {
        alignItems: 'center',
        flex: 1,
    },
    info: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'green',
        
    },
    image: {
        borderWidth: 5,
        width: 90, 
        height: 90,
        borderRadius: 45,
    }
});