import { useQuery } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import { format, isToday } from "date-fns";
import { getDate, setTimeToDate } from "../utils";

const formatter1 = new Intl.DateTimeFormat("es", {
  month: "long",
});
const formatter2 = new Intl.DateTimeFormat("es", {
  weekday: "long",
});

export function useFetchCovidResults(query, countries, date) {
  const { oldDate, newDate, originalDate } = getDate(date);
  let results = [];
  let currentData = undefined;
  let oldData = undefined;
  let currentDate = newDate;

  const { data, loading } = useQuery(query, {
    variables: {
      countries: countries,
      date: { gt: oldDate },
    },
  });

  if (data && !loading) {
    results = data.results;
  }

  if (isToday(originalDate) && data && !loading) {
    currentData = results[results.length - 1];
    oldData = results[results.length - 2];
    currentDate = setTimeToDate(new Date(currentData.date));

  // if (isToday(newDate) && getHours(newDate) < 14) {
  //   newDate = subDays(newDate, 1);
  // }
  }

  return {
    loading: loading,
    results: results,
    currentData: currentData,
    oldData: oldData,
    year: currentDate.getFullYear(),
    month: formatter1.format(currentDate),
    monthNumber: currentDate.getMonth() + 1,
    weekday: formatter2.format(currentDate),
    day: currentDate.getDate(),
    time: format(currentDate, "p"),
    isToday: isToday(currentDate),
  };
}
