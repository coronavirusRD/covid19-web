import { set, subDays } from "date-fns";
import isEmpty from "lodash/isEmpty";

const todaysDate = new Date();

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function setTimeToDate(date1, date2) {
  const today = date2 ? date2 : todaysDate;
  return set(new Date(date1), {
    hours: today.getHours(),
    minutes: today.getMinutes(),
    seconds: today.getSeconds(),
    milliseconds: today.getMilliseconds(),
  });
}

export function getDate(date) {
  let newDate;
  let originalDate;

  if (!Date.parse(date)) {
    const dateArray = !isEmpty(date) ? date.split("-") : [];
    newDate = !isEmpty(dateArray)
      ? new Date(`${dateArray[1]}-${dateArray[0]}-${dateArray[2]}`)
      : new Date();
    originalDate = newDate;
  } else {
    newDate = setTimeToDate(date);
    originalDate = newDate;
  }

  return {
    oldDate: subDays(newDate, 20),
    newDate: newDate,
    originalDate: originalDate,
  };
}
