import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import findIndex from "lodash/findIndex";
import orderBy from "lodash/orderBy";
import slice from "lodash/slice";
import { formatToAPIDate, formatToShortDate } from "../utils";

function getTopProvincesByKey(provinces, key, direction = "desc") {
  return slice(orderBy(provinces, [key], [direction]), 0, 5);
}

function formatProvincesMostConfirmed(
  oldDate,
  topOldResultProvinces,
  currentDate,
  topCurrentResultProvinces
) {
  const combinedResults = [
    { date: oldDate, provinces: topOldResultProvinces },
    { date: currentDate, provinces: topCurrentResultProvinces },
  ];

  return combinedResults[0].provinces.map((result, idx) => {
    const current = combinedResults[1].provinces[idx];

    return {
      name: result.name,
      [currentDate]: current.confirmed,
      [oldDate]: result.confirmed,
    };
  });
}

function formatProvincesMostConfirmedPercent(provinces) {
  let total = 0;
  const items = provinces.map((province) => {
    total += province.confirmedPercentage;

    return {
      name: province.name,
      confirmados: Math.round(province.confirmedPercentage),
    };
  });

  return { total, items };
}

function formatProvincesMostFI(provinces) {
  return provinces.map((province) => {
    return {
      name: province.name,
      ["F.I"]: parseFloat(province.infectionFactor.toFixed(2)),
    };
  });
}

function formatFactorInfectionData(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      ["F.I"]: parseFloat(result.infectionFactor.toFixed(2)),
    };
  });
}

function formatConfirmedPercentageData(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      ['porcentaje confirmados']: result.confirmedPercentage,
    };
  });
}

function formatReportedTestsData(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      ['pruebas reportadas']: result.reported_tests,
    };
  });
}

export function useConfirmedIndicators(currentDate, data) {
  const [chartsData, setChartsData] = useState({
    provincesTopConfirmed: [],
    provincesTopConfirmedPercent: [],
    provincesTopFI: [],
    confirmedPercentageResults: [],
    reportedTestResults: [],
    totalTopConfirmed: 0,
  });

  useEffect(() => {
    if (!isEmpty(data)) {
      const d = formatToAPIDate(currentDate);
      const idx = findIndex(data, (result) => result.date === d);
      const oldResult = idx >= 0 ? data[idx - 1] : data[0];
      const currentResult = data[idx];
      const topCurrentResultProvinces = getTopProvincesByKey(
        currentResult.provinces,
        "confirmed"
      );
      const topOldResultProvinces = getTopProvincesByKey(
        oldResult.provinces,
        "confirmed"
      );
      const orderedProvincesFI = getTopProvincesByKey(
        currentResult.provinces,
        "infectionFactor"
      );
      const provincesTopConfirmedPercent = formatProvincesMostConfirmedPercent(
        topCurrentResultProvinces
      );

      setChartsData({
        provincesTopConfirmed: formatProvincesMostConfirmed(
          formatToShortDate(new Date(oldResult.date)),
          topOldResultProvinces,
          formatToShortDate(new Date(currentResult.date)),
          topCurrentResultProvinces
        ),
        provincesTopConfirmedPercent: provincesTopConfirmedPercent.items,
        provincesTopFI: formatProvincesMostFI(orderedProvincesFI),
        factorInfectionResults: formatFactorInfectionData(data),
        confirmedPercentageResults: formatConfirmedPercentageData(data),
        reportedTestResults: formatReportedTestsData(data),
        totalTopConfirmed: `${provincesTopConfirmedPercent.total.toFixed()}%`,
      });
    }
  }, [currentDate, data]);

  return chartsData;
}
