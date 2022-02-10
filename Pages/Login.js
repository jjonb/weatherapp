import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(props.userAuth, email, password);
  };

  const login = () => {
    signInWithEmailAndPassword(props.userAuth, email, password);
  };

  useEffect(() => {
    if (props.userId !== "") {
      props.navigation.navigate("Home");
    } else {
      setEmail("");
      setPassword("");
    }
  }, [props.userId]);

  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };
  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  useEffect(() => {
    startImageRotateFunction();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d5e1df",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 75, color: "#ff1" }}>
        Weather
        <Text style={{ fontWeight: "bold", fontSize: 75, color: "orange" }}>
          Scape
        </Text>
      </Text>

      <Animated.Image
        source={require("../assets/smiley.png")}
        style={[
          {
            height: 200,
            width: 200,
            marginBottom: 10,
            transform: [{ rotate: RotateData }],
          },
        ]}
      />
      <TextInput
        style={{
          borderWidth: 1.5,
          borderColor: "orange",
          borderRadius: 5,
          backgroundColor: "white",
          marginBottom: 5,
        }}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={{
          borderWidth: 1.5,
          borderColor: "orange",
          borderRadius: 5,
          backgroundColor: "white",
          marginBottom: 5,
        }}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text
          style={{
            color: "white",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text
          style={{
            color: "white",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 30,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 10,
  },
});
export default Login;
