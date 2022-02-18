import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";

const Weather = ({ navigation, route }) => {
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
  const weather = route.params.weather;
  //console.log(weather);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#87ceeb",
          width: 100 + "%",
          borderRadius: 25,
          height: 80 + "%",
        }}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={{
            uri: getIcon(weather.weather[0].icon),
          }}
        />

        {route.params.dailyWeather ? (
          <Text>{convertTime2(weather.dt)}</Text>
        ) : (
          <Text>Time: {convertTime(weather.dt)} PST</Text>
        )}

        {route.params.dailyWeather ? (
          <Text>Temperature: {weather.temp.day} F</Text>
        ) : (
          <Text>Temperature: {weather.temp} F</Text>
        )}
        <Text>Humidity: {weather.humidity}%</Text>
        <Text>Wind Speed: {weather.wind_speed} MPH</Text>

        <Text>Description: {weather.weather[0].description}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Weather;
