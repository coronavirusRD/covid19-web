import React, { memo } from "react";
import PropTypes from "prop-types";
import { getDate, getMonth } from "date-fns";
import { Chart } from "../../../../components";
import { formatDate } from "../../../../utils";

const ConfirmedEvolutionChart = ({ date, results }) => {
  return (
    <Chart
      className="covid19-confirmed-discarded-chart"
      height={350}
      title="cantidad de casos descartados y confirmados por d&iacute;a"
      note={`el gráfico comienza a partir del ${formatDate(date.start)}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D. | Johns Hopkins Coronavirus Resource Center"
      noteLocationBottom={false}
      colors={["#7ed321", "#d0021b"]}
      data={results.map((result) => {
        const date = new Date(result.date);

        return {
          name: `${getDate(date)}/${getMonth(date) + 1}`,
          discarded: result.discarded,
          confirmados: result.confirmed,
        };
      })}
    />
  );
};

ConfirmedEvolutionChart.defaultProps = {
  date: {
    start: null,
    end: null,
  },
  results: [],
};

ConfirmedEvolutionChart.propTypes = {
  date: PropTypes.shape({
    start: PropTypes.object,
    end: PropTypes.object,
  }),
  results: PropTypes.array,
};

export default memo(ConfirmedEvolutionChart);
