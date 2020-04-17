import {
  set,
  format,
  getDate as getDay,
  getMonth,
  getYear,
  parseISO,
  subDays,
} from "date-fns";
import { es } from "date-fns/locale";
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

  if (!parseISO(date)) {
    const dateArray = !isEmpty(date) ? date.split("-") : [];
    newDate = !isEmpty(dateArray)
      ? new Date(dateArray[2], parseInt(dateArray[1]) - 1, dateArray[0])
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

export function formatToShortDate(date) {
  return `${getDay(date)}/${getMonth(date) + 1}`;
}

export function formatToLongDate(date) {
  return `${getDay(date)}/${getMonth(date) + 1}/${getYear(date)}`;
}

export function formatToFullDate(date) {
  return `${getDay(date)} de ${format(date, "LLLL", {
    locale: es,
  })} de ${getYear(date)}`;
}

export function formatToAPIDate(date) {
  return `${getYear(date)}-${format(date, "M")}-${format(date, "d")}`;
}
