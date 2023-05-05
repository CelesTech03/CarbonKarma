import { KeyboardAvoidingView, Text, View } from "react-native";
import { React, useEffect, useState } from 'react'
import styles from "./styles/LeaderboardStyle"
import { FlatList, StatusBar, Image } from "react-native";
import firebase from "firebase/compat/app";
import { useIsFocused } from "@react-navigation/native";

const LeaderboardScreen = () =>  {
  const isFocused = useIsFocused();

  const [currentUser, setCurrentUser] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [users, setUsers] = useState([]);

  const db = firebase.firestore();

  const getUsersData = () => {
    let temp = [];
    db.collection("users")
      .orderBy('userName', 'desc')
      .limit(50)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let user_name = doc.data().userName;
          
          temp.push({
            id: doc.id,
            name: user_name,
            score: Math.round(Math.random() * 100)
          });
        })
        temp.sort((a, b) => b.score - a.score);
        setUsers(temp);
        setIsRefresh(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleRefresh = () => {
    setIsRefresh(true);
    getUsersData();
  }


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getUsersData();
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, [isFocused]);

  const Item = (props) => {
    const container_style = [styles.item_container]

    let border_color = 'skyblue';
    if(props.position <= 2) {
      if(props.position == 0) {
        border_color = 'gold';
      }
      else if(props.position == 1) {
        border_color = 'silver';
      }
      else if(props.position == 2) {
        border_color = '#722626';
      }
    }

    if(props.id === currentUser.uid) {
      container_style.push({backgroundColor: 'lightblue'});
    }
      
    return (
      <View style={container_style}>
        <View style={styles.image_container}>
          <Image 
              style={[styles.image, {borderColor: border_color}]}
              source={require("../assets/who_pokemon.jpg")} />
              <Text style={styles.info}>{props.position + 1}</Text>
        </View>
        <View style={styles.detail_container}>
          <Text style={styles.info}>{props.name}</Text>
          <Text style={styles.info}>Score: {props.score}</Text>
        </View> 
      </View>   
    );
  }

  
  if(users != []) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar hidden={true} />
        <View style={styles.title_container}>
          <Text style={styles.title}>Leaderboard</Text>
        </View>
        <View style={styles.items_container}>
          <FlatList  
            data={users}
            renderItem={({item, index}) => {
              return (<Item 
                        name={item.name} 
                        score={item.score} 
                        position={index}
                        id = {item.id} />
              )}
            }
            refreshing={isRefresh}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: 125,
              offset: 125 * index,
              index 
            })}
          />
        </View>   
      </KeyboardAvoidingView>
    );
  }  
};

export default LeaderboardScreen