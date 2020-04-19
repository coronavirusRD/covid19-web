import { useQuery } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import reverse from "lodash/reverse";
import slice from "lodash/slice";
import { addDays, differenceInDays, isToday } from "date-fns";
import extraData from "../resources/data/covid19";
import provincesData from "../resources/data/provincias";
import {
  formatToFullDate,
  formatToLongDate,
  formatToShortDate,
  formatToAPIDate,
  getLongWeekday,
  getLongMonth,
  getDate,
  getHour,
  replaceDashDate,
  setTimeToDate,
} from "../utils";
import has from "lodash/has";

function getInfectionFactor(current, old) {
  return current.confirmed !== 0 || old.confirmed !== 0
    ? current.confirmed / old.confirmed
    : 0;
}

function getGeneralValues(results, originalDate, newDate) {
  let idx = 0;

  if (isToday(originalDate)) {
    idx = results.length - 1;
  } else if (!isToday(originalDate)) {
    const d = formatToAPIDate(newDate);
    idx = results.findIndex((result) => result.date === d);
  }

  const currentData = results[idx];
  const oldData = results[idx - 1];

  return {
    currentData: currentData,
    oldData: oldData,
    currentDate: setTimeToDate(new Date(replaceDashDate(currentData.date))),
    oldInfectionFactor: getInfectionFactor(oldData, results[idx - 2]),
  };
}

function getCurrentDateInfo(currentDate, startDate, endDate) {
  const estimateDate = addDays(currentDate, 5);

  return {
    currentDate: currentDate,
    startDate: startDate,
    shorCurrentDate: formatToShortDate(currentDate),
    longCurrentDate: formatToLongDate(currentDate),
    shortStartDate: formatToShortDate(startDate),
    longStartDate: formatToLongDate(startDate),
    shortEndDate: formatToShortDate(endDate),
    longEndDate: formatToLongDate(endDate),
    shortEstimateDate: formatToShortDate(estimateDate),
    longEstimateDate: formatToLongDate(estimateDate),
    fullEstimateDate: formatToFullDate(estimateDate),
    year: currentDate.getFullYear(),
    startMonth: startDate ? getLongMonth(startDate) : "",
    month: currentDate ? getLongMonth(currentDate) : "",
    monthNumber: currentDate.getMonth() + 1,
    weekday: currentDate ? getLongWeekday(currentDate) : "",
    day: currentDate.getDate(),
    time: getHour(currentDate),
    isToday: isToday(currentDate),
  };
}

function addExtraDataToProvinces(current, nextItem) {
  const newProvincesData = [];

  if (has(current, "provinces")) {
    const provinces = reverse(current.provinces);

    for (let i = provinces.length - 1; i >= 0; i--) {
      const province = provinces[i];
      const confirmedPercent = (province.confirmed / current.confirmed) * 100;
      const deathsPercent = (province.deaths / current.deaths) * 100;
      const total = find(provincesData, { name: province.name }).total;
      let provinceInfectionFactor = 0;

      const item = find(nextItem.provinces, {
        name: province.name,
      });

      provinceInfectionFactor = getInfectionFactor(province, item);

      newProvincesData.push({
        ...province,
        confirmedPercentage: confirmedPercent,
        deathsPercent: deathsPercent,
        infectionFactor: provinceInfectionFactor,
        cumulativeIncidence: (province.confirmed / total) * 100000,
        confirmedVariation: province.confirmed - item.confirmed,
      });
    }
  }

  return newProvincesData;
}

function addExtraDataToInsultationType(current, old) {
  return {
    ...current.insulation_type,
    variationHospitable:
      current.insulation_type.hospitable - old.insulation_type.hospitable,
    variationDomiciliary:
      current.insulation_type.domiciliary - old.insulation_type.domiciliary,
  };
}

function addExtraDataToResults(results) {
  const newResults = [];

  results.forEach((result) => {
    const item = find(extraData, { date: result.date });

    if (item) {
      item.total_tests =
        has(result, "confirmed") && has(item, "discarded")
          ? result.confirmed + item.discarded
          : 0;
      newResults.push(Object.assign(result, item));
    }
  });

  return newResults;
}

export function useFetchCovidResults(query, countries, date, limit) {
  const { oldDate, newDate, originalDate } = getDate(date, limit);
  let results = [];
  let isLoading = true;
  let currentData = undefined;
  let oldData = undefined;
  let oldInfectionFactor = 0;
  let averageInfectionFactor = 0;
  let currentDate = newDate;
  let startDate = null;
  let endDate = null;

  const { data, loading } = useQuery(query, {
    variables: {
      countries: countries,
      date: { gt: oldDate },
    },
  });

  if (data && !loading) {
    let newResults = data.results;
    let average = 0;
    const lastAPIDate = new Date(newResults[newResults.length - 1].date);
    const lastCovid19Date = new Date(extraData[extraData.length - 1].date);
    const needToAddNewData =
      differenceInDays(lastCovid19Date, lastAPIDate) >= 1;
    const newData = { date: formatToAPIDate(new Date()) };

    /* The API we are using right now is adding today's data at 8:00 PM and DR new report is at 10 AM,
    so we need to manually insert the data */
    if (needToAddNewData) newResults = newResults.concat(newData);

    newResults = addExtraDataToResults(newResults);

    for (let i = newResults.length - 1; i >= 0; i--) {
      const result = newResults[i];

      if (i !== 0) {
        const nextItem = newResults[i - 1];
        const infectionFactor = getInfectionFactor(result, nextItem);
        average += infectionFactor;
        result.infectionFactor = infectionFactor;
        result.active = result.confirmed - result.deaths - result.recovered;
        result.reported_tests = Math.abs(
          result.total_tests - nextItem.total_tests
        );
        result.confirmedPercentage = Math.round(
          ((result.confirmed - nextItem.confirmed) / result.confirmed) * 100
        );

        result.provinces = addExtraDataToProvinces(result, nextItem);

        result.insulation_type = addExtraDataToInsultationType(
          result,
          nextItem
        );
      }
    }

    results = slice(newResults, 1, newResults.length);

    averageInfectionFactor = average / results.length;
    console.log("RESULTS", results);
    startDate = new Date(replaceDashDate(results[0].date));
    endDate = new Date(replaceDashDate(results[results.length - 1].date));

    const values = getGeneralValues(results, originalDate, newDate);

    currentData = values.currentData;
    oldData = values.oldData;
    currentDate = values.currentDate;
    oldInfectionFactor = values.oldInfectionFactor;
  }

  const d = getCurrentDateInfo(currentDate, startDate, endDate);

  isLoading = false;

  return {
    loading: isLoading,
    results: results,
    currentData: currentData,
    oldData: oldData,
    infectionFactor: !isEmpty(currentData)
      ? getInfectionFactor(currentData, oldData).toFixed(2)
      : 0,
    oldInfectionFactor: oldInfectionFactor.toFixed(2),
    averageInfectionFactor: averageInfectionFactor.toFixed(2),
    date: d,
  };
}
