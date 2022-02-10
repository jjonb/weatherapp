import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [current, setCurrent] = useState({});
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);

  //API key
  const APIkey = "169d5ed7001d90a1b245882d19adc7b9";

  //Coordinates for San Jose, CA
  const lat = 37.33;
  const lon = -121.84;

  //Async function that will get the weather data.
  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${APIkey}`
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
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flex: 1, alignItems: "center", top: 20 }}>
          <Text>Welcome, User!</Text>
          <CurrentWeather current={current} />
          <HourlyWeather hourly={hourly} />
          <DailyWeather daily={daily} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d5e1df",
    alignItems: "center",
    justifyContent: "center",
  },
});
