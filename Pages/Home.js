import React, { useRef, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import CurrentWeather from "../components/CurrentWeather";
import DailyWeather from "../components/DailyWeather";
import HourlyWeather from "../components/HourlyWeather";
import * as Location from "expo-location";

const Home = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [current, setCurrent] = useState({});
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [location, setLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);
  const signOut = () => {
    props.userAuth.signOut();
    props.navigation.navigate("Login");
  };

  const controller = new AbortController();
  const { signal } = controller;

  //API key
  const APIkey = "169d5ed7001d90a1b245882d19adc7b9";

  //Async function that will get the weather data.
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };
  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=imperial&exclude=minutely&appid=${APIkey}`,
        { signal }
      );
      const json = await response.json();
      setCurrent(json.current);
      setHourly(json.hourly.slice(1, 5));
      setDaily(json.daily.slice(1, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return getLocation();
  }, []);

  useEffect(() => {
    if (location !== null) {
      getWeather();
      return () => controller.abort();
    }
  }, [location]);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // <View
        //   style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        // >
        //   <Text>Loading</Text>
        // </View>
        <View style={{ flex: 1, alignItems: "center", top: 50 }}>
          <Text>Welcome, User!</Text>
          <CurrentWeather navigation={props.navigation} current={current} />
          <HourlyWeather hourly={hourly} />
          <DailyWeather daily={daily} />
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={{ color: "white" }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d5e1df",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 75,
    height: 30,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 10,
  },
});
export default Home;
