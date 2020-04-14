import { useEffect, useState } from "react";
import { addDays, format, getDate, getMonth, getYear } from "date-fns";
import { es } from "date-fns/locale";
import { formatDate, formatToShortDate } from "../utils";
import { useDetailDate } from "./useDetailDate";

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

function getScenariosItems(date, data) {
  const omsInfectionFactor = "2.00";
  const chartData1 = getChartData(data.averageInfectionFactor, data.results);
  const chartData2 = getChartData(data.infectionFactor, data.results);
  const chartData3 = getChartData(omsInfectionFactor, data.results);

  return [
    {
      title: `usando el factor promedio de infección del ${date.shortStartDate} al ${date.currentFormattedDate}`,
      stickyNotes: [
        {
          title: "factor promedio de infección",
          value: data.averageInfectionFactor,
          type: "warning",
        },
        {
          title: `estimación cantidad de posibles casos para el ${date.fullEstimateDate}`,
          value: chartData1[chartData1.length - 1].confirmados,
        },
        {
          title: `Esta condición solo se da si este factor de infección se mantiene hasta el ${date.shortEstimateDate}; esto puede aumentar o disminuir.`,
          type: "note",
        },
      ],
      chartData: chartData1,
    },
    {
      title: `usando el factor de infección más reciente al ${date.currentFormattedDate}`,
      stickyNotes: [
        {
          title: "factor de infección más reciente",
          value: data.infectionFactor,
          type: "warning",
        },
        {
          title: `estimación cantidad de posibles casos para el ${date.fullEstimateDate}`,
          value: chartData2[chartData2.length - 1].confirmados,
        },
        {
          title: `Esta condición solo se da si este factor de infección se mantiene hasta el ${date.shortEstimateDate}; esto puede aumentar o disminuir.`,
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
          value: omsInfectionFactor,
          type: "warning",
        },
        {
          title: `estimación cantidad de posibles casos para el ${date.fullEstimateDate}`,
          value: chartData3[chartData3.length - 1].confirmados,
        },
        {
          title: `Esta condición solo se da si este factor de infección se mantiene hasta el ${date.shortEstimateDate}; esto puede aumentar o disminuir.`,
          type: "note",
        },
      ],
      chartData: chartData3,
    },
  ];
}

export function useGrowthEstimates(data) {
  const [date, setDate] = useState({
    estimateDate: "",
    formattedDate: "",
  });
  const d = useDetailDate(data.results);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data.currentDate) {
      const estimateDate = addDays(data.currentDate, 5);

      setDate({
        shortStartDate: `${getDate(d.start)}/${getMonth(d.start) + 1}`,
        shortEstimateDate: `${getDate(estimateDate)}/${
          getMonth(estimateDate) + 1
        }`,
        longEstimateDate: formatDate(estimateDate),
        fullEstimateDate: `${getDate(estimateDate)} de ${format(
          estimateDate,
          "LLLL",
          { locale: es }
        )} de ${getYear(estimateDate)}`,
        currentFormattedDate: `${getDate(data.currentDate)}/${
          getMonth(data.currentDate) + 1
        }`,
      });
    }
  }, [d.start, data.currentDate]);

  useEffect(() => {
    setItems(getScenariosItems(date, data));
  }, [data.infectionFactor, data.averageInfectionFactor, data.results]); //eslint-disable-line

  return {
    title: "Estimaciones del crecimiento del virus",
    subtitle: `Nota: extendimos las estimaciones hasta el ${
      date.longEstimateDate
    } (+5 días) y los escenarios comienzan a partir del día ${formatDate(
      d.start
    )}`,
    items: items,
  };
}
