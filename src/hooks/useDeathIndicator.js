import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import findIndex from "lodash/findIndex";
import { formatToAPIDate, getTopProvincesByKey, formatToShortDate } from "../utils";

const WOMEN = "mujeres";
const MEN = "hombres";

function getCurrentDeathsByGender(currentData) {
  return [
    {
      name: "totales",
      mujeres: currentData.gender.women.deaths,
      hombres: currentData.gender.men.deaths,
    },
  ];
}

function getTopProvincesDeaths(provinces) {
  return provinces.map((province) => {
    return {
      name: province.name,
      fallecidos: province.deaths,
    };
  });
}

function getTopProvincesDeathsRate(provinces) {
  return provinces.map((province) => {
    return {
      name: province.name,
      "% tasa letalidad": parseInt((province.deathsRate * 1000).toFixed()),
    };
  });
}

function getDeathsData(results) {
  return results.map((result) => {
    return {
      name: formatToShortDate(new Date(result.date)),
      defunciones: result.deaths,
      'nuevas defunciones': result.newDeaths,
    }
  });
}

export function useDeathIndicator(currentDate, data) {
  const [chartsData, setChartsData] = useState({
    currentGenderDeathsData: [],
    topProvincesDeathsData: [],
    topDeathsGender: 0,
    topDeathsGenderPercent: 0,
    topDeathsGenderKey: "",
    totalDeaths: 0,
  });

  useEffect(() => {
    if (!isEmpty(data)) {
      const d = formatToAPIDate(currentDate);
      const idx = findIndex(data, (result) => result.date === d);
      const currentResult = data[idx];
      const totalDeaths = currentResult.deaths;
      const womenDeaths = currentResult.gender.women.deaths;
      const menDeaths = currentResult.gender.men.deaths;
      const womenDeathPercent = ((womenDeaths / totalDeaths) * 100).toFixed();
      const menDeathPercent = ((menDeaths / totalDeaths) * 100).toFixed();
      const topProvincesDeaths = getTopProvincesByKey(
        currentResult.provinces,
        "deaths"
      );
      const topProvincesDeathsRate = getTopProvincesByKey(
        currentResult.provinces,
        "deathsRate"
      );

      setChartsData({
        currentGenderDeathsData: getCurrentDeathsByGender(currentResult),
        topProvincesDeathsData: getTopProvincesDeaths(topProvincesDeaths),
        topProvincesDeathRateData: getTopProvincesDeathsRate(
          topProvincesDeathsRate
        ),
        deathsResults: getDeathsData(data),
        topDeathsGender:
          womenDeathPercent > menDeathPercent ? womenDeaths : menDeaths,
        topDeathsGenderPercent:
          womenDeathPercent > menDeathPercent
            ? womenDeathPercent
            : menDeathPercent,
        topDeathsGenderKey: womenDeathPercent > menDeathPercent ? WOMEN : MEN,
        totalDeaths: totalDeaths,
      });
    }
  }, [currentDate, data]);

  return chartsData;
}
