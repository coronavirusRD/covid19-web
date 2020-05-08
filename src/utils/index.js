import {
  set,
  differenceInDays,
  getDate as getDay,
  getMonth,
  getYear,
  parseISO,
  subDays,
  isValid,
} from "date-fns";
import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";
import slice from "lodash/slice";

const REPORTS_STARTED_DATE = "2020-03-23";

const todaysDate = new Date();
const formatterMonth = new Intl.DateTimeFormat("es", { month: "long" });
const formatterDay = new Intl.DateTimeFormat("es", { weekday: "long" });
const formatterHour = new Intl.DateTimeFormat("es", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function replaceDashDate(date) {
  return date.replace(/-/g, "/");
}

export function getTopProvincesByKey(provinces, key, direction = "desc", end = 5) {
  return slice(orderBy(provinces, [key], [direction]), 0, end);
}

export function getReportNumber() {
  return differenceInDays(todaysDate, new Date(REPORTS_STARTED_DATE));
}

export function setTimeToDate(date) {
  const today = date ? date : todaysDate;
  return set(new Date(date), {
    hours: today.getHours(),
    minutes: today.getMinutes(),
    seconds: today.getSeconds(),
    milliseconds: today.getMilliseconds(),
  });
}

export function getDate(date, limit) {
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
    oldDate: subDays(newDate, limit),
    newDate: newDate,
    originalDate: originalDate,
  };
}

export function getLongMonth(date) {
  return isValid(date) ? formatterMonth.format(date) : "";
}

export function getLongWeekday(date) {
  return isValid(date) ? formatterDay.format(date) : "";
}

export function getHour(date) {
  return isValid(date) ? formatterHour.format(date) : "";
}

export function formatToShortDate(date) {
  return isValid(date) ? `${getDay(date)}/${getMonth(date) + 1}` : "";
}

export function formatToLongDate(date) {
  return isValid(date)
    ? `${getDay(date)}/${getMonth(date) + 1}/${getYear(date)}`
    : "";
}

export function formatToFullDate(date) {
  return isValid(date)
    ? `${getDay(date)} de ${getLongMonth(date)} de ${getYear(date)}`
    : "";
}

export function formatToAPIDate(date) {
  return isValid(date)
    ? `${getYear(date)}-${getMonth(date) + 1}-${getDay(date)}`
    : "";
}
