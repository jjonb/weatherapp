import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
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
        <Text style={{ color: "blue", fontSize: 20 }}>Hourly Forecast:</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <FlatList
          data={hourly}
          keyExtractor={({ id }, index) => index}
          renderItem={({ item }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                marginBottom: 5,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: getIcon(item.weather[0].icon),
                }}
              />
              <Text></Text>
              <Text>Time: {convertTime(item.dt)} PST</Text>
              <Text>Temperature: {item.temp} F</Text>
              <Text>Description: {item.weather[0].description}</Text>
            </View>
          )}
        />
      </Collapsible>
    </View>
  );
};

export default HourlyWeather;
