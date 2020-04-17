import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";
import { formatToShortDate } from "../../../../utils";

const ConfirmedEvolutionChart = ({ longStartDate, results }) => {
  return (
    <Chart
      className="covid19-confirmed-discarded-chart"
      height={350}
      title="cantidad de casos descartados y confirmados por d&iacute;a"
      note={`el gráfico comienza a partir del ${longStartDate}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D. | Johns Hopkins Coronavirus Resource Center"
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
  longStartDate: '',
  results: [],
};

ConfirmedEvolutionChart.propTypes = {
  longStartDate: PropTypes.string,
  results: PropTypes.array,
};

export default memo(ConfirmedEvolutionChart);
