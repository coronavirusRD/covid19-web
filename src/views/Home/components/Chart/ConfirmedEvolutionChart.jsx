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
          confirmados: result.confirmed,
          defunciones: result.deaths,
          recuperados: result.recovered,
        };
      });

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
      className="covid19-evolution-chart"
      type="line"
      height={700}
      title="evoluci&oacute;n del virus a nivel de casos confirmados en el pa&iacute;s"
      note={`el gráfico comienza a partir del ${data.startDay}/${data.startMonth}/${data.startYear}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D. | Johns Hopkins Coronavirus Resource Center"
      explanatoryNote={`Los datos reportados en la gráfica corresponden al corte del informe presentado por el Ministerio de Salud a las 10:00 a.m. del ${data.endDay}/${data.endMonth}/${data.endYear}`}
      noteLocationBottom={false}
      colors={["#f79a3a", "#d0021b", "#7ed321"]}
      data={data.chart}
    />
  );
};

ConfirmedEvolutionChart.defaultProps = {
  results: [],
  date: {
    startDay: 0,
    startMonth: 0,
    startYear: 0,
    endDay: 0,
    endMonth: 0,
    endYear: 0,
  },
};

ConfirmedEvolutionChart.propTypes = {
  results: PropTypes.array,
};

export default memo(ConfirmedEvolutionChart);
