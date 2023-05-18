import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        textAlign: "center",
    },
    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        margin: 10,
        marginTop: 50,
    },
    title_container: {
        width: '100%',
        alignItems: 'center',
    },
    items_container: {
        width: '100%',
        marginBottom: 245,
    },
    image_container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
    },
    item_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    detail_container: {
        marginTop: 25,
        flex: 1,
    },
    info: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'black',
    },
    image: {
        borderWidth: 3,
        width: 90, 
        height: 90,
        borderRadius: 45,
    },
    score_item: {
        marginTop: 25,
        marginRight: 20,
    },
});