function getDate(UNIX_timestamp) {
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
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var day = days[a.getDay()];
  var month = months[a.getMonth()];
  var date = a.getDate();

  var time = day + ", " + month + " " + date;
  return time;
}
export default getDate;
