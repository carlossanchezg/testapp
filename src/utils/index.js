export const isNetworkAvailable = () => {
  return navigator.onLine
};

export const isEmpty = str => !str || ((typeof str === 'string') && str.replace(' ', '').length < 1);

export const isAlarmInPresent = alarm => {
  const dateTime = new Date();
  const tMinute = dateTime.getMinutes();
  const tHour = dateTime.getHours();
  const tDay = dateTime.getDate();
  const tMonth = dateTime.getMonth();
  const tYear = dateTime.getFullYear();

  if (alarm.year > tYear) return true;
  if (alarm.year === tYear && alarm.month > tMonth) return true;
  if (alarm.year === tYear && alarm.month === tMonth && alarm.day > tDay) return true;
  if (
    alarm.year === tYear && alarm.month === tMonth &&
    alarm.day === tDay && alarm.hour > tHour
  ) return true;
  
  if (
    alarm.year === tYear && alarm.month === tMonth &&
    alarm.day === tDay && alarm.hour === tHour && alarm.minute > tMinute
  ) return true;

  return false;
}

export const handleReadableDate = (hour, minute) => {
  var h = hour,
    m = minute;
  var time;
  if (h === 12) {
    time = m >= 0 && m <= 9 ? h + ":" + "0" + m + " PM" : h + ":" + m + " PM";
  } else {
    time =
      m >= 0 && m <= 9
        ? h > 12
          ? h - 12 + ":" + "0" + m + " PM"
          : h + ":" + "0" + m + " AM"
        : h > 12
        ? h - 12 + ":" + m + " PM"
        : h + ":" + m + " AM";
  }
  return time;
};

export const colorOptions = [
  { label: "Low", value: 0, color: "#14D378" },
  { label: "Half", value: 1, color: "#FFD25F" },
  { label: "High", value: 2, color: "#F22C50" },
];

export const modeOptions = [
  { label: "Notification", value: 0 },
  { label: "Alarm", value: 1 },
];

export const hourOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "13" },
  { value: 14, label: "14" },
  { value: 15, label: "15" },
  { value: 16, label: "16" },
  { value: 17, label: "17" },
  { value: 18, label: "18" },
  { value: 19, label: "19" },
  { value: 20, label: "20" },
  { value: 21, label: "21" },
  { value: 22, label: "22" },
  { value: 23, label: "23" },
  { value: 24, label: "24" },
];

export const minuteOptions = [
  { value: 0, label: "00" },
  { value: 1, label: "01" },
  { value: 2, label: "02" },
  { value: 3, label: "03" },
  { value: 4, label: "04" },
  { value: 5, label: "05" },
  { value: 6, label: "06" },
  { value: 7, label: "07" },
  { value: 8, label: "08" },
  { value: 9, label: "09" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "13" },
  { value: 14, label: "14" },
  { value: 15, label: "15" },
  { value: 16, label: "16" },
  { value: 17, label: "17" },
  { value: 18, label: "18" },
  { value: 19, label: "19" },
  { value: 20, label: "20" },
  { value: 21, label: "21" },
  { value: 22, label: "22" },
  { value: 23, label: "23" },
  { value: 24, label: "24" },
  { value: 25, label: "25" },
  { value: 26, label: "26" },
  { value: 27, label: "27" },
  { value: 28, label: "28" },
  { value: 29, label: "29" },
  { value: 30, label: "30" },
  { value: 31, label: "31" },
  { value: 32, label: "32" },
  { value: 33, label: "33" },
  { value: 34, label: "34" },
  { value: 35, label: "35" },
  { value: 36, label: "36" },
  { value: 37, label: "37" },
  { value: 38, label: "38" },
  { value: 39, label: "39" },
  { value: 40, label: "40" },
  { value: 41, label: "41" },
  { value: 42, label: "42" },
  { value: 43, label: "43" },
  { value: 44, label: "44" },
  { value: 45, label: "45" },
  { value: 46, label: "46" },
  { value: 47, label: "47" },
  { value: 48, label: "48" },
  { value: 49, label: "49" },
  { value: 50, label: "50" },
  { value: 51, label: "51" },
  { value: 52, label: "52" },
  { value: 53, label: "53" },
  { value: 54, label: "54" },
  { value: 55, label: "55" },
  { value: 56, label: "56" },
  { value: 57, label: "57" },
  { value: 58, label: "58" },
  { value: 59, label: "59" },
];

export const icons = [
  { iconCode: "anchor" },
  { iconCode: "angle-double-down" },
  { iconCode: "ambulance" },
  { iconCode: "allergies" },
  { iconCode: "baby-carriage" },
  { iconCode: "atom" },
  { iconCode: "ban" },
  { iconCode: "anchor" },
  { iconCode: "angle-double-down" },
  { iconCode: "ambulance" },
  { iconCode: "allergies" },
  { iconCode: "baby-carriage" },
  { iconCode: "atom" },
  { iconCode: "ban" },
  { iconCode: "anchor" },
  { iconCode: "angle-double-down" },
  { iconCode: "ambulance" },
  { iconCode: "allergies" },
  { iconCode: "baby-carriage" },
  { iconCode: "atom" },
  { iconCode: "ban" },
];

export const courseColors = [
  { color1: "#007CE0", color2: "#00DAC2", position: 0 },
  { color1: "#1907BC", color2: "#8013BD", position: 1 },
  { color1: "#F8404C", color2: "#FD2E92", position: 2 },
  { color1: "#F747E5", color2: "#7647FC", position: 3 },
  { color1: "#0031E0", color2: "#021195", position: 4 },
  { color1: "#BD00FF", color2: "#2C0057", position: 5 },
  { color1: "#FF7532", color2: "#E8207A", position: 6 },
  { color1: "#00FFC1", color2: "#02E3C5", position: 7 },
];

export const routinesColors = [
  { color1: "#0B6DF6", color2: "#003BDC", position: 0 },
  { color1: "#7A0DE5", color2: "#BE2DFD", position: 1 },
  { color1: "#FF7D34", color2: "#FFAD80", position: 2 },
  { color1: "#00FFC1", color2: "#1E95A8", position: 3 },
  { color1: "#A1D8F7", color2: "#003BDC", position: 4 },
  { color1: "#FF0085", color2: "#D55CFF", position: 5 },
  { color1: "#FF7532", color2: "#E8207A", position: 6 },
  { color1: "#00FFC1", color2: "#02E3C5", position: 7 },
];
