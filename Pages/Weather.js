import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import convertImages from "../functions/convertImages";
import getBackground from "../functions/getBackground";

const Weather = ({ navigation, route }) => {
  const [background, setBackground] = useState(null);

  const getIcon = (itemId) => {
    return `http://openweathermap.org/img/wn/${itemId}@2x.png`;
  };
  const convertTime = (dt) => {
    var date = new Date(dt * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  };
  function convertTime2(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

    var time = month + " " + date + ", " + year;
    return time;
  }
  // useEffect(() => {
  //   setBackground(
  //     <ImageBackground
  //       source={getBackground(weather.weather[0].icon)}
  //       //source={getBackground("d")}
  //       resizeMode="cover"
  //       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
  //     ></ImageBackground>
  //   );
  // }, []);
  const weather = route.params.weather;
  //console.log(weather);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={getBackground(weather.weather[0].icon)}
        //source={getBackground("d")}
        resizeMode="cover"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={convertImages(weather.weather[0].icon)}
        />

        {route.params.dailyWeather ? (
          <Text
            style={[
              styles.text,
              {
                color: weather.weather[0].icon.includes("d")
                  ? "white"
                  : "orange",
              },
            ]}
          >
            {convertTime2(weather.dt)}
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              {
                color: weather.weather[0].icon.includes("d")
                  ? "white"
                  : "orange",
              },
            ]}
          >
            {convertTime(weather.dt)} PST
          </Text>
        )}

        {route.params.dailyWeather ? (
          <Text
            style={[
              styles.text,
              {
                color: weather.weather[0].icon.includes("d")
                  ? "white"
                  : "orange",
              },
            ]}
          >
            🌡️ {Math.round(weather.temp.day)}° F
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              {
                color: weather.weather[0].icon.includes("d")
                  ? "white"
                  : "orange",
              },
            ]}
          >
            🌡️ {Math.round(weather.temp)}° F
          </Text>
        )}
        <Text
          style={[
            styles.text,
            {
              color: weather.weather[0].icon.includes("d") ? "white" : "orange",
            },
          ]}
        >
          🌧 Humidity: {weather.humidity}%
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: weather.weather[0].icon.includes("d") ? "white" : "orange",
            },
          ]}
        >
          💨 {weather.wind_speed} MPH
        </Text>

        <Text
          style={[
            styles.text,
            {
              color: weather.weather[0].icon.includes("d") ? "white" : "orange",
            },
          ]}
        >
          ✏️ {weather.weather[0].description}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
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

export default Weather;
