import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-snap-carousel";

const window = Dimensions.get("window");

const HourlyWeather = ({ hourly }) => {
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
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (dim) => {
      setDimensions(dim.window);
      //console.log(window.window.width);
    });
    return () => subscription?.remove();
  });

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpanded}>
        <Text style={{ color: "blue", fontSize: 20 }}>Hourly Forecast</Text>
      </TouchableOpacity>
      <View style={{ width: dimensions.width, padding: 10 }}>
        <Carousel
          data={hourly}
          horizontal={true}
          layout={"default"}
          keyExtractor={(id, index) => index}
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
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#F9F1F0",
  },
});

export default HourlyWeather;
