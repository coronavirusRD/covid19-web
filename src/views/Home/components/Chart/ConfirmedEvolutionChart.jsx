import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";
import { formatToShortDate } from "../../../../utils";

const ConfirmedEvolutionChart = ({ shortStartDate, results }) => {
  return (
    <Chart
      className="covid19-evolution-chart"
      type="line"
      height={500}
      title="evoluci&oacute;n del virus en el pa&iacute;s"
      note={`el gráfico comienza a partir del ${shortStartDate}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D."
      noteLocationBottom={false}
      colors={["#f79a3a", "#d0021b", "#7ed321"]}
      data={results.map((result) => {
        const date = new Date(result.date);

        return {
          name: `${formatToShortDate(date)}`,
          confirmados: result.confirmed,
          defunciones: result.deaths,
          recuperados: result.recovered,
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
