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

const HourlyWeather = (props) => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  const [dimensions, setDimensions] = useState(window);

  const getIcon = (itemId) => {
    return `http://openweathermap.org/img/wn/${itemId}@2x.png`;
  };
  const convertTime = (dt) => {
    var date = new Date(dt * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    if (hours === 0) {
      return 12 + ":" + minutes.substr(-2) + " AM";
    }
    if (hours === 12) {
      return hours + ":" + minutes.substr(-2) + " PM";
    }
    if (hours >= 13) {
      return hours - 12 + ":" + minutes.substr(-2) + " PM";
    }

    return hours + ":" + minutes.substr(-2) + " AM";
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (dim) => {
      setDimensions(dim.window);
    });
    return () => subscription?.remove();
  });
  const Circle = (props) => {
    return (
      <View>
        <Text style={{ color: props.color }}>●</Text>
      </View>
    );
  };
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "white", fontSize: 20 }}>⏰ Hourly Forecast</Text>

      <View
        style={{
          position: "relative",
          width: dimensions.width,
          alignItems: "center",
        }}
      >
        <Carousel
          data={props.hourly}
          sliderWidth={dimensions.width}
          style={{ alignItems: "center", justifyContent: "center" }}
          itemWidth={200}
          ref={isCarousel}
          onSnapToItem={(index) => setIndex(index)}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              onPress={() =>
                props.navigation.navigate("Weather", {
                  weather: item,
                  offset: props.offset,
                })
              }
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: props.isDay ? "#0199e5" : "#0a273d",
                borderColor: "yellow",
                elevation: 2,
                borderWidth: 1,
                width: 200,
                borderRadius: 25,
                height: 140,
                marginRight: 10,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={convertImages(item.weather[0].icon)}
              />
              <Text style={styles.text}>
                ⏳ {convertTime(item.dt + props.offset)}
              </Text>
              <Text style={styles.text}>🌡 {Math.round(item.temp)}° F</Text>
              <Text style={styles.text}>✏️ {item.weather[0].description}</Text>
            </Pressable>
          )}
        />
      </View>
      <View style={{ position: "absolute", flexDirection: "row", bottom: 0 }}>
        {props.hourly.map((data, i) =>
          i === index ? (
            <Circle color={"white"} key={i} />
          ) : (
            <Circle color={"darkgray"} key={i} />
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
      {index !== props.hourly.length - 1 ? (
        <View style={{ position: "absolute", right: 40, top: 75 }}>
          <TouchableOpacity onPress={() => isCarousel.current.snapToNext()}>
            <AntDesign name="rightcircle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#F9F1F0",
  },
});

export default HourlyWeather;
