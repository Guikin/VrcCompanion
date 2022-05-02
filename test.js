const date = "Thu May 26 2022 20:00:00 GMT-0400 (Eastern Daylight Time)"
const newDate = date.substring(0, Math.min(date.length, 16));
console.log(newDate)