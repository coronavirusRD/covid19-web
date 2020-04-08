import isEmpty from "lodash/isEmpty";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getDate(date) {
  if (Date.parse(date)) return new Date(date);
  else {
    const dateArray = !isEmpty(date) ? date.split("-") : [];
    const newDate = !isEmpty(dateArray)
      ? new Date(`${dateArray[1]}-${dateArray[0]}-${dateArray[2]}`)
      : new Date();
    return newDate;
  }
}
