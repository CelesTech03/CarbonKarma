import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

/* 
References:
Firebase Storage Upload Files Documentation: https://firebase.google.com/docs/storage/web/upload-files,
Expo Image Picker Package Documentation: https://docs.expo.dev/versions/latest/sdk/imagepicker/,
Youtube: https://www.youtube.com/watch?v=oqxehWLvLEA&t=1288s,
*/

function UploadImage() {
  const { logIn } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadAvatar = async () => {
    try {
      // If no avatar, skips the upload and proceeds to logging in
      if (avatar) {
        const response = await fetch(avatar);
        const blob = await response.blob();

        const storageRef = firebase.storage().ref();
        const avatarRef = storageRef.child(
          `avatars/${firebase.auth().currentUser.uid}`
        );

        await avatarRef.put(blob);

        const avatarUrl = await avatarRef.getDownloadURL();
        // Update the user's profile with the image URL
        await firebase.auth().currentUser.updateProfile({
          photoURL: avatarUrl,
        });
      }
      // Navigate to the next screen (homepage)
      logIn();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarPlaceholder} onPress={pickImage}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Text>Choose Avatar</Text>
        )}
      </TouchableOpacity>

      {/*Bottom Nav buttons here */}
      <TouchableOpacity
        style={styles.Backbutton}
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/back.png")}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Nextbutton}
        activeOpacity={0.5}
        onPress={uploadAvatar}
      >
        <Image
          source={require("../assets/right-arrow.png")}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "400",
    fontSize: 35,
    color: "black",
    marginLeft: "5%",
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  Backbutton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    margin: 5,
    borderWidth: 0.5,
    height: 40,
  },
  Nextbutton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    margin: 5,
    borderWidth: 0.5,
    height: 40,
  },
  buttonIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
  },
});
