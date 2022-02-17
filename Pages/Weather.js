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
  const weather = route.params.weather;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#87ceeb",
          width: 200,
          borderRadius: 25,
          height: 150,
        }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: getIcon(weather.weather[0].icon),
          }}
        />
        <Text>Time: {convertTime(weather.dt)} PST</Text>
        <Text>Temperature: {weather.temp} F</Text>
        <Text>Description: {weather.weather[0].description}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Weather;
