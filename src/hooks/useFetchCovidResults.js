import { useQuery } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import { format, isToday } from "date-fns";
import extraData from "../resources/data";
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
    results = data.results.map((result) => {
      let newObj = result;
      const item = find(extraData, { date: result.date });

      if (item) Object.assign(newObj, item);

      return newObj;
    });
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
    infectionFactor: !isEmpty(currentData)
      ? (currentData.confirmed / oldData.confirmed).toFixed(2)
      : 0,
    oldInfectionFactor: !isEmpty(currentData)
      ? (oldData.confirmed / results[results.length - 3].confirmed).toFixed(2)
      : 0,
    currentDate: currentDate,
    year: currentDate.getFullYear(),
    month: formatter1.format(currentDate),
    monthNumber: currentDate.getMonth() + 1,
    weekday: formatter2.format(currentDate),
    day: currentDate.getDate(),
    time: format(currentDate, "p"),
    isToday: isToday(currentDate),
  };
}
