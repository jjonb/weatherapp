import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState("");

  const userAuth = getAuth();

  useEffect(() => {
    onAuthStateChanged(userAuth, (user) => {
      if (user !== null) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <Login {...props} userAuth={userAuth} userId={userId}></Login>
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <Home {...props} userAuth={userAuth} userId={userId}></Home>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
