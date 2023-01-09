import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar,Button } from "react-native-paper";

const Register = ({navigation,route}) => {

    const [avatar,setAvatar] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleImage = () => {
      navigation.navigate("camera")

    }

    const registerHandler = () => {
        console.log("Register Here")
    }

    useEffect(()=>{
      if(route.params){
        if(route.params.image){
          setAvatar(route.params.image)
        }
      }
    },[route])



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={{ backgroundColor: "#900" }}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={{ color: "#900" }}>Change Photo</Text>
      </TouchableOpacity>
      <View style={{width:"70%"}}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        disabled={!email || !password || !name}
        style={styles.btn}
        onPress={registerHandler}
      >
        <Text style={{ color: "#fff" }}>Register</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text
          style={{
            color: "#900",
            height: 30,
            margin: 20,
          }}
        >
          Have an Account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
    marginTop: 10,
  },
});
