import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import convertImages from "../functions/convertImages.js";

const CurrentWeather = (props) => {
  console.log(convertImages(props.current.weather[0].icon));
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
    <Pressable
      style={{
        alignItems: "center",
      }}
      onPress={() =>
        props.navigation.navigate("Weather", { weather: props.current })
      }
    >
      <Text style={{ color: "red", fontSize: 20 }}>Current Weather</Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#87ceeb",
          width: 350,
          borderRadius: 25,
          height: 275,
        }}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={convertImages(props.current.weather[0].icon)}
        />
        <Text style={styles.text}>
          Time: {convertTime(props.current.dt)} PST
        </Text>
        <Text style={styles.text}>Temperature: {props.current.temp} F</Text>
        <Text style={styles.text}>
          Description: {props.current.weather[0].description}
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#F9F1F0",
  },
});
export default CurrentWeather;
