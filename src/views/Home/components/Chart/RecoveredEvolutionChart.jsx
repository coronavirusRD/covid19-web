import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";
import { formatToShortDate } from "../../../../utils";

const RecoveredEvolutionChart = ({ shortStartDate, results }) => {
  return (
    <Chart
      className="covid19-evolution-chart"
      height={350}
      title="evoluci&oacute;n de los pacientes recuperados"
      note={`el gráfico comienza el ${shortStartDate}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D."
      noteLocationBottom={false}
      colors={["#7ed321"]}
      data={results.map((result) => {
        const date = new Date(result.date);

        return {
          name: `${formatToShortDate(date)}`,
          recuperados: result.recovered,
        };
      })}
    />
  );
};

RecoveredEvolutionChart.defaultProps = {
  shortStartDate: '',
  results: [],
};

RecoveredEvolutionChart.propTypes = {
  shortStartDate: PropTypes.string,
  results: PropTypes.array,
};

export default memo(RecoveredEvolutionChart);
