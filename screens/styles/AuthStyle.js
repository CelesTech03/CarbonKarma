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
    color: "#00695C",
    marginBottom: 40,
  },
  labelText: {
    color: "#00695C",
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
    backgroundColor: "#00695C",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#00695C",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#00695C",
    fontWeight: "700",
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: "#FF0D10",
  },
  image: {
    height: 100,
    width: 100,
    marginLeft: 140
  },
  settingHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 15
  },
  settingContainer: {
    textAlign: "left",
    flex: 1,
    justifyContent: 'center'
  },
  settingTitle: {
    fontWeight: "800",
    fontSize: 35,
    marginBottom: 40,
    textAlign: 'center',
    color: "#00695C"
  },
  settingText: {
    fontSize: 16,
    marginLeft: 40,
    marginBottom: 20
  },
  settingsInput: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200
  },
  dropdownContainer: {
    marginTop: "7%",
    width: "80%",
    zIndex: 100,
  },
  settingsButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  settingsSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalIcon: {
    marginBottom: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  }
});
