import { useQuery } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import { format, isToday } from "date-fns";
import { es } from "date-fns/locale";
import extraData from "../resources/data";
import { getDate, setTimeToDate } from "../utils";

export function useFetchCovidResults(query, countries, date) {
  console.log("DATE", date);
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
    month: format(currentDate, "LLLL", { locale: es }),
    monthNumber: currentDate.getMonth() + 1,
    weekday: format(currentDate, "cccc", { locale: es }),
    day: currentDate.getDate(),
    time: format(currentDate, "p"),
    isToday: isToday(currentDate),
  };
}
