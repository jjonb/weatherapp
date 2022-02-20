import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-native-snap-carousel";
import convertImages from "../functions/convertImages";
import { AntDesign } from "@expo/vector-icons";

const window = Dimensions.get("window");

const DailyWeather = (props) => {
  const [dimensions, setDimensions] = useState(window);
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (dim) => {
      setDimensions(dim.window);
      //console.log(window.window.width);
    });
    return () => subscription?.remove();
  });
  const getIcon = (itemId) => {
    return `http://openweathermap.org/img/wn/${itemId}@2x.png`;
  };

  function convertTime(UNIX_timestamp) {
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

  const Circle = (props) => {
    return (
      <View>
        <Text style={{ color: props.color }}>●</Text>
      </View>
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "white", fontSize: 20 }}>🗓️ Daily Forecast</Text>
      <View style={{ flexDirection: "row" }}>
        {props.daily.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                props.navigation.navigate("Weather", {
                  weather: item,
                  dailyWeather: true,
                });
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: dimensions.width / 4,
                borderRightWidth: index !== props.daily.length - 1 ? 1 : 0,
                borderColor: "white",
                height: 125,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={convertImages(item.weather[0].icon)}
              />
              <Text style={styles.text}>
                {convertTime(item.dt + props.offset)}
              </Text>
              <Text style={styles.text}>{Math.round(item.temp.day)}° F</Text>
              <Text style={styles.text}>{item.weather[0].description}</Text>
            </Pressable>
          );
        })}
      </View>
      {/* <View style={{ width: dimensions.width, alignItems: "center" }}>
        <Carousel
          data={props.daily}
          sliderWidth={dimensions.width}
          style={{ alignItems: "center", justifyContent: "center" }}
          itemWidth={200}
          ref={isCarousel}
          onSnapToItem={(index) => setIndex(index)}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              onPress={() => {
                props.navigation.navigate("Weather", {
                  weather: item,
                  dailyWeather: true,
                });
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#6fb2e7",
                width: 200,
                borderRadius: 25,
                height: 150,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={convertImages(item.weather[0].icon)}
              />
              <Text style={styles.text}>{convertTime(item.dt)}</Text>
              <Text style={styles.text}>Temperature: {item.temp.day} F</Text>
              <Text style={styles.text}>
                Description: {item.weather[0].description}
              </Text>
            </Pressable>
          )}
        />
      </View>
      <View style={{ position: "absolute", flexDirection: "row", bottom: 0 }}>
        {props.daily.map((data, i) =>
          i === index ? (
            <Circle color={"black"} key={i} />
          ) : (
            <Circle color={"grey"} key={i} />
          )
        )}
      </View>
      {index !== 0 ? (
        <View style={{ position: "absolute", left: 40, top: 75 }}>
          <TouchableOpacity onPress={() => isCarousel.current.snapToPrev()}>
            <AntDesign name="leftcircle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : null}
      {index !== props.daily.length - 1 ? (
        <View style={{ position: "absolute", right: 40, top: 75 }}>
          <TouchableOpacity onPress={() => isCarousel.current.snapToNext()}>
            <AntDesign name="rightcircle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#F9F1F0",
  },
});
export default DailyWeather;
