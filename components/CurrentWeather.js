import { View, Text, Image, StyleSheet } from "react-native";
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
      <Text style={{ color: "red", fontSize: 20 }}>Current</Text>
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
            uri: getIcon(current.weather[0].icon),
          }}
        />
        <Text style={styles.text}>Time: {convertTime(current.dt)} PST</Text>
        <Text style={styles.text}>Temperature: {current.temp} F</Text>
        <Text style={styles.text}>
          Description: {current.weather[0].description}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#F9F1F0",
  },
});
export default CurrentWeather;
