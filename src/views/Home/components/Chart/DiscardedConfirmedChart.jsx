import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { getDate, getMonth, getYear } from "date-fns";
import { Chart } from "../../../../components";

const ConfirmedEvolutionChart = ({ results }) => {
  const [data, setData] = useState({
    chartData: [],
    startDay: 0,
    startMonth: 0,
    startYear: 0,
    endDay: 0,
    endMonth: 0,
    endYear: 0,
  });

  useEffect(() => {
    if (!isEmpty(results)) {
      const startDate = new Date(results[0].date);
      const endDate = new Date(results[results.length - 1].date);
      const chart = results.map((result) => {
        const date = new Date(result.date);

        return {
          name: `${getDate(date)}/${getMonth(date) + 1}`,
          discarded: result.discarded,
          confirmados: result.confirmed,
        }
      })

      setData({
        chart: chart,
        startDay: getDate(startDate),
        startMonth: getMonth(startDate) + 1,
        startYear: getYear(startDate),
        endDay: getDate(endDate),
        endMonth: getMonth(endDate) + 1,
        endYear: getYear(endDate),
      });
    }
  }, [results]);

  return (
    <Chart
      className="covid19-confirmed-discarded-chart"
      height={350}
      title="cantidad de casos descartados y confirmados por d&iacute;a"
      note={`el gráfico comienza a partir del ${data.startDay}/${data.startMonth}/${data.startYear}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D. | Johns Hopkins Coronavirus Resource Center"
      noteLocationBottom={false}
      colors={["#7ed321", "#d0021b"]}
      data={data.chart}
    />
  );
};

ConfirmedEvolutionChart.defaultProps = {
  results: [],
};

ConfirmedEvolutionChart.propTypes = {
  results: PropTypes.array,
};

export default memo(ConfirmedEvolutionChart);
