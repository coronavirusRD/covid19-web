import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import filter from "lodash/filter";
import { formatToAPIDate, formatToShortDate, getTopProvincesByKey } from "../utils";

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

export function useProvincesConfirmedEvolution(currentDate, data) {
  const [chartsData, setChartsData] = useState({
    provincesTopCurrentConfirmed: [],
    provincesConfimedIncidenceResults: [],
    hospitableResults: [],
    domiciliaryResults: [],
    activeResultsData: [],
    provincesNewConfirmedData: [],
  });

  useEffect(() => {
    if (!isEmpty(data)) {
      const d = formatToAPIDate(currentDate);
      const idx = findIndex(data, (result) => result.date === d);
      const currentResult = data[idx];
      const topCurrentResultProvinces = getTopProvincesByKey(
        currentResult.provinces,
        "confirmed"
      );

      setChartsData({
        provincesConfimedIncidenceResults: formatProvincesConfirmedIncidenceData(
          currentResult.provinces
        ),
        provincesTopCurrentConfirmed: formatProvincesTopCurrentConfirmed(
          data,
          topCurrentResultProvinces
        ),
        provincesNewConfirmedData: formartProvincesNewConfirmedData(
          currentResult
        ),
        hospitableResults: formatHospitableResults(data),
        domiciliaryResults: formatDomiciliaryResults(data),
        activeResultsData: formatActiveResultsData(data),
      });
    }
  }, [currentDate, data]);

  return chartsData;
}
