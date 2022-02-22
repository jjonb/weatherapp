import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import convertImages from "../functions/convertImages.js";
import getDate from "../functions/getDate.js";
import getTime from "../functions/getTime.js";
const CurrentWeather = (props) => {
  // console.log(props.offsetCurrent);
  // console.log(props.offsetOrigin);
  // console.log(props.offset);
  return (
    <Pressable
      style={{
        alignItems: "center",
      }}
      onPress={() =>
        props.navigation.navigate("Weather", {
          weather: props.current,
          offset: props.offset,
        })
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
            {getDate(props.current.dt + props.offset)}
          </Text>
          <Text style={styles.text}>
            ⏳ {getTime(props.current.dt + props.offset)}
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
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});
export default CurrentWeather;
