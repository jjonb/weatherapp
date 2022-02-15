import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Collapsible from "react-native-collapsible";

const HourlyWeather = ({ hourly }) => {
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

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpanded}>
        <Text style={{ color: "blue", fontSize: 20 }}>Hourly Forecast</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <FlatList
          data={hourly}
          style={{ height: 310 }}
          keyExtractor={({ id }, index) => index}
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
              <Text style={styles.text}>Time: {convertTime(item.dt)} PST</Text>
              <Text style={styles.text}>Temperature: {item.temp} F</Text>
              <Text style={styles.text}>
                Description: {item.weather[0].description}
              </Text>
            </View>
          )}
        />
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#F9F1F0",
  },
});

export default HourlyWeather;
