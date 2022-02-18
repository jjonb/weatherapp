const getBackground = (icon) => {
  if (icon.includes("d")) return require("../assets/backgroundimages/day.jpg");
  if (icon.includes("n"))
    return require("../assets/backgroundimages/night.jpg");
};

export default getBackground;
