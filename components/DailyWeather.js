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

const DailyWeather = ({ daily }) => {
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

    var time = date + " " + month + " " + year;
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
      <Collapsible collapsed={collapsed} align="center">
        <FlatList
          data={daily}
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
              <Text style={styles.text}>{convertTime(item.dt)}</Text>
              <Text style={styles.text}>Temperature: {item.temp.day} F</Text>
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
export default DailyWeather;
