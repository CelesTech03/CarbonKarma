import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: "center",
    marginTop: 80,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
  },
  username: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#00695C",
  },
  scoresContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2.5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 175,
    backgroundColor: "#fff",
  },
  score: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dailyScoreLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  dailyScoreValue: {
    fontSize: 26,
    fontWeight: "bold",
    marginRight: 5,
  },
  scoreLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
