import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import orderBy from "lodash/orderBy";
import slice from "lodash/slice";
import filter from "lodash/filter";
import { formatToAPIDate, formatToShortDate } from "../utils";

function getTopProvincesByKey(provinces, key, direction = "desc", end = 5) {
  return slice(orderBy(provinces, [key], [direction]), 0, end);
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

function formatProvincesTopCurrentConfirmed(results, topProvinces) {
  const provinces = [];

  results.forEach((result) => {
    let data = {
      name: formatToShortDate(new Date(result.date)),
    };

    topProvinces.forEach((province) => {
      const currentProvince = find(result.provinces, { name: province.name });

      data = { ...data, [province.name]: currentProvince.confirmed };
    });

    provinces.push(data);
  });

  return provinces;
}

function formatProvincesMostFI(provinces) {
  return provinces.map((province) => {
    return {
      name: province.name,
      "F.I": parseFloat(province.infectionFactor.toFixed(2)),
    };
  });
}

function formatFactorInfectionData(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      "F.I": parseFloat(result.infectionFactor.toFixed(2)),
    };
  });
}

function formatConfirmedPercentageData(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      "porcentaje confirmados": result.confirmedPercentage,
    };
  });
}

function formatReportedTestsData(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      "pruebas reportadas": result.reported_tests,
    };
  });
}

function formatProvincesConfirmedIncidenceData(provinces) {
  const orderedProvinces = getTopProvincesByKey(
    provinces,
    "confirmed",
    "desc",
    20
  );
  return orderedProvinces.map((province) => {
    return {
      name: province.name,
      "acumulado confirmados": province.confirmed,
      "casos (IA) por 100,000 hab": Math.round(province.cumulativeIncidence),
    };
  });
}

function formatHospitableResults(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      hospitalizados: result.insulation_type.hospitable,
      variación: result.insulation_type.variationHospitable,
    };
  });
}

function formatDomiciliaryResults(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      domiciliario: result.insulation_type.domiciliary,
      variación: result.insulation_type.variationDomiciliary,
    };
  });
}

function formatActiveResultsData(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      activos: result.active,
    };
  });
}

function formartProvincesNewConfirmedData(result) {
  const key = "casos nuevos";
  const provinces = getTopProvincesByKey(
    result.provinces,
    "confirmedVariation",
    "desc",
    result.provinces.length
  );

  return filter(
    provinces.map((province) => {
      return {
        name: province.name,
        [key]: province.confirmedVariation,
      };
    }),
    (item) => item[key] !== 0
  );
}

export function useConfirmedIndicators(currentDate, data) {
  const [chartsData, setChartsData] = useState({
    provincesTopConfirmed: [],
    provincesTopConfirmedPercent: [],
    provincesTopCurrentConfirmed: [],
    provincesTopFI: [],
    confirmedPercentageResults: [],
    reportedTestResults: [],
    provincesConfimedIncidenceResults: [],
    hospitableResults: [],
    domiciliaryResults: [],
    activeResultsData: [],
    provincesNewConfirmedData: [],
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
        provincesTopCurrentConfirmed: formatProvincesTopCurrentConfirmed(
          data,
          topCurrentResultProvinces
        ),
        provincesTopFI: formatProvincesMostFI(orderedProvincesFI),
        factorInfectionResults: formatFactorInfectionData(data),
        confirmedPercentageResults: formatConfirmedPercentageData(data),
        reportedTestResults: formatReportedTestsData(data),
        provincesConfimedIncidenceResults: formatProvincesConfirmedIncidenceData(
          currentResult.provinces
        ),
        hospitableResults: formatHospitableResults(data),
        domiciliaryResults: formatDomiciliaryResults(data),
        activeResultsData: formatActiveResultsData(data),
        provincesNewConfirmedData: formartProvincesNewConfirmedData(
          currentResult
        ),
        totalTopConfirmed: `${provincesTopConfirmedPercent.total.toFixed()}%`,
      });
    }
  }, [currentDate, data]);

  return chartsData;
}
