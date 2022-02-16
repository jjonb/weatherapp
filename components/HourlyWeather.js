import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-native-snap-carousel";

const window = Dimensions.get("window");

const HourlyWeather = ({ hourly }) => {
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
    return hours + ":" + minutes.substr(-2);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (dim) => {
      setDimensions(dim.window);
    });
    return () => subscription?.remove();
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "blue", fontSize: 20 }}>Hourly Forecast</Text>

      <View
        style={{
          position: "relative",
          width: dimensions.width,
          alignItems: "center",
        }}
      >
        <Carousel
          data={hourly}
          sliderWidth={dimensions.width}
          style={{ alignItems: "center", justifyContent: "center" }}
          itemWidth={200}
          ref={isCarousel}
          onSnapToItem={(index) => setIndex(index)}
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#87ceeb",
                width: 200,
                borderRadius: 25,
                height: 150,
                marginRight: 10,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: getIcon(item.weather[0].icon),
                }}
              />
              <Text style={styles.text}>Time: {convertTime(item.dt)} PST</Text>
              <Text style={styles.text}>Temperature: {item.temp} F</Text>
              <Text style={styles.text}>
                Description: {item.weather[0].description}
              </Text>
            </View>
          )}
        />
      </View>

      {index !== 0 ? (
        <View style={{ position: "absolute", left: 40, top: 70 }}>
          <TouchableOpacity onPress={() => isCarousel.current.snapToPrev()}>
            <Text style={{ fontSize: 50, color: "red" }}>◀</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {index !== hourly.length - 1 ? (
        <View style={{ position: "absolute", right: 40, top: 70 }}>
          <TouchableOpacity onPress={() => isCarousel.current.snapToNext()}>
            <Text style={{ fontSize: 50, color: "red" }}>▶</Text>
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
