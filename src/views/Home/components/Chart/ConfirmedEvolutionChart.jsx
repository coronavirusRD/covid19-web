import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";
import { formatToShortDate } from "../../../../utils";

const ConfirmedEvolutionChart = ({ longStartDate, longEndDate, results }) => {
  return (
    <Chart
      className="covid19-evolution-chart"
      type="line"
      height={700}
      title="evoluci&oacute;n del virus a nivel de casos confirmados en el pa&iacute;s"
      note={`el gráfico comienza a partir del ${longStartDate}`}
      primarySource="Ministerio de Salud P&uacute;blica de la R.D. | Johns Hopkins Coronavirus Resource Center"
      explanatoryNote={`Los datos reportados en la gráfica corresponden al corte del informe presentado por el Ministerio de Salud a las 10:00 a.m. del ${longEndDate}`}
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
  longStartDate: '',
  longEndDate: '',
  results: [],
};

ConfirmedEvolutionChart.propTypes = {
  longStartDate: PropTypes.string,
  longEndDate: PropTypes.string,
  results: PropTypes.array,
};

export default memo(ConfirmedEvolutionChart);
