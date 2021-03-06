import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";
import { formatToShortDate } from "../../../../utils";

const ConfirmedEvolutionChart = ({ shortStartDate, results }) => {
  return (
    <Chart
      className="covid19-confirmed-discarded-chart"
      height={350}
      title="evoluci&oacute;n de casos descartados y confirmados"
      note={`el gráfico comienza el ${shortStartDate}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D."
      noteLocationBottom={false}
      colors={["#7ed321", "#d0021b"]}
      data={results.map((result) => {
        const date = new Date(result.date);

        return {
          name: `${formatToShortDate(date)}`,
          descartados: result.discarded,
          confirmados: result.confirmed,
        };
      })}
    />
  );
};

ConfirmedEvolutionChart.defaultProps = {
  shortStartDate: '',
  results: [],
};

ConfirmedEvolutionChart.propTypes = {
  shortStartDate: PropTypes.string,
  results: PropTypes.array,
};

export default memo(ConfirmedEvolutionChart);
