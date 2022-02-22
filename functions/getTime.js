const getTime = (dt) => {
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

export default getTime;
