import React, { memo } from "react";
import PropTypes from "prop-types";
import { getDate, getMonth } from "date-fns";
import { Chart } from "../../../../components";
import { formatDate } from "../../../../utils";

const ConfirmedEvolutionChart = ({ date, results }) => {
  return (
    <Chart
      className="covid19-evolution-chart"
      type="line"
      height={700}
      title="evoluci&oacute;n del virus a nivel de casos confirmados en el pa&iacute;s"
      note={`el gráfico comienza a partir del ${formatDate(date.start)}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D. | Johns Hopkins Coronavirus Resource Center"
      explanatoryNote={`Los datos reportados en la gráfica corresponden al corte del informe presentado por el Ministerio de Salud a las 10:00 a.m. del ${formatDate(
        date.end
      )}`}
      noteLocationBottom={false}
      colors={["#f79a3a", "#d0021b", "#7ed321"]}
      data={results.map((result) => {
        const date = new Date(result.date);

        return {
          name: `${getDate(date)}/${getMonth(date) + 1}`,
          confirmados: result.confirmed,
          defunciones: result.deaths,
          recuperados: result.recovered,
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
