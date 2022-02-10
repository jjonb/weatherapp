import { View, Text, Image } from "react-native";
import React from "react";

const CurrentWeather = ({ current }) => {
  const getIcon = (itemId) => {
    return `http://openweathermap.org/img/wn/${itemId}@2x.png`;
  };
  const convertTime = (dt) => {
    var date = new Date(dt * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  };

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text style={{ color: "red", fontSize: 20 }}>Current:</Text>
      <View style={{ borderWidth: 1, alignItems: "center" }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: getIcon(current.weather[0].icon),
          }}
        />
        <Text>Time: {convertTime(current.dt)} PST</Text>
        <Text>Temperature: {current.temp} F</Text>
        <Text>Description: {current.weather[0].description}</Text>
      </View>
    </View>
  );
};

export default CurrentWeather;
