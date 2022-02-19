import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import convertImages from "../functions/convertImages.js";
const CurrentWeather = (props) => {
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
      <View
        style={{
          borderRadius: 150,
          backgroundColor: props.current.weather[0].icon.includes("d")
            ? "#0199e5"
            : "#091f2d",
          shadowColor: "#000",
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 1,
          shadowRadius: 1,
          elevation: 3,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 300,
            // borderWidth: 2,
            //borderColor: "blue",
            padding: 0,
            paddingBottom: 20,
            borderRadius: 150,
            height: 300,
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={convertImages(props.current.weather[0].icon)}
          />
          <Text style={styles.text}>
            ⏳ {convertTime(props.current.dt)} PST
          </Text>
          <Text style={styles.text}>🌡 {Math.round(props.current.temp)}° F</Text>
          <Text style={styles.text}>
            ✏️ {props.current.weather[0].description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#F19B4D",
    fontSize: 17,
    fontWeight: "bold",
  },
});
export default CurrentWeather;
