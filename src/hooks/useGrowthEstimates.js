import { useEffect, useState } from "react";
import { addDays, format, getYear } from "date-fns";
import { formatToShortDate } from "../utils";

function getChartData(infectionFactor, results) {
  const date = new Date(results[results.length - 1].date);
  const newDates = [];
  const length = results.length;
  let lastConfirmedValue = results[length - 1].confirmed;

  for (let i = 1; i <= 5; i++) {
    lastConfirmedValue = lastConfirmedValue * infectionFactor;
    const newDate = addDays(date, i);
    newDates.push({
      date: `${getYear(newDate)}-${format(newDate, "M")}-${format(
        newDate,
        "d"
      )}`,
      confirmed: Math.round(lastConfirmedValue),
    });
  }

  const newResults = results.concat(newDates);
  const items = newResults.map((result, index) => {
    // const key = index < newResults.length - 5 ? "confirmados" : "descartados";

    return {
      // key: key,
      name: `${formatToShortDate(new Date(result.date))}`,
      confirmados: result.confirmed,
    };
  });

  return items;
}

function getScenariosItems(data) {
  const chartData1 = getChartData(data.averageInfectionFactor, data.results);
  const chartData2 = getChartData(data.infectionFactor, data.results);
  const chartData3 = getChartData(data.omsInfectionFactor, data.results);

  return [
    {
      title: `usando el factor promedio de infección del ${data.shortStartDate} al ${data.shortEstimateDate}`,
      stickyNotes: [
        {
          title: "factor promedio de infección",
          value: data.averageInfectionFactor,
          type: "warning",
        },
        {
          title: `estimación cantidad de posibles casos para el ${data.fullEstimateDate}`,
          value: chartData1[chartData1.length - 1].confirmados,
        },
        {
          title: `Esta condición solo se da si este factor de infección se mantiene hasta el ${data.shortEstimateDate}; esto puede aumentar o disminuir.`,
          type: "note",
        },
      ],
      chartData: chartData1,
    },
    {
      title: `usando el factor de infección más reciente al ${data.shortEstimateDate}`,
      stickyNotes: [
        {
          title: "factor de infección más reciente",
          value: data.infectionFactor,
          type: "warning",
        },
        {
          title: `estimación cantidad de posibles casos para el ${data.fullEstimateDate}`,
          value: chartData2[chartData2.length - 1].confirmados,
        },
        {
          title: `Esta condición solo se da si este factor de infección se mantiene hasta el ${data.shortEstimateDate}; esto puede aumentar o disminuir.`,
          type: "note",
        },
      ],
      chartData: chartData2,
    },
    {
      title: "usando el factor de infección menor de la oms para el covid-19",
      stickyNotes: [
        {
          title: "factor de infección menor de la oms",
          value: data.omsInfectionFactor,
          type: "warning",
        },
        {
          title: `estimación cantidad de posibles casos para el ${data.fullEstimateDate}`,
          value: chartData3[chartData3.length - 1].confirmados,
        },
        {
          title: `Esta condición solo se da si este factor de infección se mantiene hasta el ${data.shortEstimateDate}; esto puede aumentar o disminuir.`,
          type: "note",
        },
      ],
      chartData: chartData3,
    },
  ];
}

export function useGrowthEstimates(data) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getScenariosItems(data));
  }, [data.results]); //eslint-disable-line

  return {
    title: "Estimaciones del crecimiento del virus",
    subtitle: `Nota: extendimos las estimaciones hasta el ${
      data.longEstimateDate
    } (+5 días) y los escenarios comienzan a partir del día ${data.longStartDate}`,
    items: items,
  };
}
