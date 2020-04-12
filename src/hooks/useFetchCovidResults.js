import { useQuery } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import { format, isToday } from "date-fns";
import { es } from "date-fns/locale";
import extraData from "../resources/data";
import { getDate, setTimeToDate } from "../utils";

export function useFetchCovidResults(query, countries, date) {
  const { oldDate, newDate, originalDate } = getDate(date);
  let results = [];
  let currentData = undefined;
  let oldData = undefined;
  let oldInfectionFactor = 0;
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
    oldInfectionFactor = (
      oldData.confirmed / results[results.length - 3].confirmed
    ).toFixed(2);
  } else if (!isToday(originalDate) && data && !loading) {
    const d = `${format(newDate, "yyyy")}-${format(newDate, "M")}-${format(
      newDate,
      "d"
    )}`;
    const idx = results.findIndex((result) => result.date === d);
    console.log(d, idx);
    currentData = results[idx];
    oldData = results[idx - 1];
    currentDate = setTimeToDate(new Date(currentData.date));
    oldInfectionFactor = (
      oldData.confirmed / results[idx - 2].confirmed
    ).toFixed(2);
  }

  return {
    loading: loading,
    results: results,
    currentData: currentData,
    oldData: oldData,
    infectionFactor: !isEmpty(currentData)
      ? (currentData.confirmed / oldData.confirmed).toFixed(2)
      : 0,
    oldInfectionFactor: oldInfectionFactor,
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
