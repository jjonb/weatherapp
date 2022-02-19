import React, { useRef, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SearchBar } from "react-native-elements";

import CurrentWeather from "../components/CurrentWeather";
import DailyWeather from "../components/DailyWeather";
import HourlyWeather from "../components/HourlyWeather";
import getBackground from "../functions/getBackground";
import * as Location from "expo-location";

const Home = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [current, setCurrent] = useState({});
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

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
      const response2 = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&limit=5&appid=${APIkey}`,
        { signal }
      );
      const json = await response.json();
      const json2 = await response2.json();

      setCurrent(json.current);
      setHourly(json.hourly.slice(1, 5));
      setDaily(json.daily.slice(1, 5));
      setCity(json2[0].name + ", " + json2[0].state);
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
  console.log(city);
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
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={getBackground(current.weather[0].icon)}
            //source={getBackground("d")}
            resizeMode="cover"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "yellow",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Welcome, User!
            </Text>
            <Text
              style={{
                color: "yellow",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {city}
            </Text>
            <CurrentWeather navigation={props.navigation} current={current} />
            <SearchBar
              containerStyle={{
                width: 80 + "%",
                padding: 0,
                marginTop: 10,
                marginBottom: 10,
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
                backgroundColor: "transparent",
              }}
              placeholder={"Look for another City"}
              onChangeText={setSearch}
              value={search}
              round={true}
              lightTheme={true}
            />
            <HourlyWeather navigation={props.navigation} hourly={hourly} />
            <DailyWeather navigation={props.navigation} daily={daily} />
            <TouchableOpacity style={styles.button} onPress={signOut}>
              <Text style={{ color: "white" }}>Sign Out</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
