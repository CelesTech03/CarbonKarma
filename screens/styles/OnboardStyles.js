import { StyleSheet } from "react-native";

// Authentication screens styling
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 35,
    color: "seagreen",
    marginBottom: 40,
  },
  labelText: {
    color: "seagreen",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 4,
    marginTop: 5,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "seagreen",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 150,
    marginBottom: 50
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "seagreen",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "seagreen",
    fontWeight: "700",
    fontSize: 16,
  },
  heading: {
    fontWeight: '400',
    fontSize: 30,
    color: 'black',
    padding: 60,
    marginLeft: '5%'
  },
  text: {
    fontSize: 16,
    marginLeft: '30%',
    marginBottom: 20
    },
    bottomLine: {
        marginTop: 200,
        marginLeft: 25
    },
    bottomRightText: {
        backgroundColor: "white",
        borderColor: "seagreen",
        fontSize: 16
    },
    bottomLeftText: {
        backgroundColor: "white",
        marginRight: 5,
        borderColor: "seagreen",
        fontSize: 16
    },
    Backbutton: {
        marginRight: 350,
        fontSize: 30
    },
    Nextbutton: {
        marginLeft: 350,
        fontSize: 30
    }
});
