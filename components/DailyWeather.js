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
import Collapsible from "react-native-collapsible";
import Carousel from "react-native-snap-carousel";
const window = Dimensions.get("window");

const DailyWeather = ({ daily }) => {
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
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpanded}>
        <Text style={{ color: "blue", fontSize: 20 }}>Daily Forecast</Text>
      </TouchableOpacity>
      <View style={{ width: dimensions.width, alignItems: "center" }}>
        <Carousel
          data={daily}
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
                marginBottom: 10,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: getIcon(item.weather[0].icon),
                }}
              />
              <Text style={styles.text}>{convertTime(item.dt)}</Text>
              <Text style={styles.text}>Temperature: {item.temp.day} F</Text>
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
      {index !== daily.length - 1 ? (
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
export default DailyWeather;
