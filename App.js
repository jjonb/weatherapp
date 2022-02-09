import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

const convertTime = (dt) => {
  var date = new Date(dt * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  return hours + ":" + minutes.substr(-2);
};

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
      setHourly(json.hourly);
      setDaily(json.daily);
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
        <View>
          <Text style={{ color: "blue", fontSize: 20 }}>
            San Jose Hourly Forecast
          </Text>
          <FlatList
            data={hourly}
            keyExtractor={({ id }, index) => index}
            renderItem={({ item }) => (
              <Text>
                Time: {convertTime(item.dt)} PST Temperature: {item.temp} F
              </Text>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
