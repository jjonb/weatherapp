const convertImages = (icon) => {
  if (icon === "01d") return require("../assets/weathericons/sunny_clear.png");
  if (icon === "01n") return require("../assets/weathericons/night_clear.png");
  if (icon === "02d") return require("../assets/weathericons/sunny_cloudy.png");
  if (icon === "02n") return require("../assets/weathericons/night_cloudy.png");

  if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n")
    return require("../assets/weathericons/scattered.png");
  if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n")
    return require("../assets/weathericons/rainy.png");
  if (icon === "11d" || icon === "11n")
    return require("../assets/weathericons/thunder.png");
  if (icon === "13d" || icon === "13n")
    return require("../assets/weathericons/snow.png");
  if (icon === "50d" || icon === "50n")
    return require("../assets/weathericons/mist.png");
};

export default convertImages;
