import React, { memo } from "react";
import PropTypes from "prop-types";
import { getDate, getMonth } from "date-fns";
import { Chart } from "../../../../components";
import { formatDate } from "../../../../utils";

const GrowthScenarioChart = ({ results }) => {
  return (
    <Chart
      className="covid19-growth-scenario1"
      type="line"
      height={350}
      title="evoluci&oacute;n del virus en escenario # 1"
      primarySource="Johns Hopkins Coronavirus Resource Center"
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

GrowthScenarioChart.defaultProps = {
  results: [],
};

GrowthScenarioChart.propTypes = {
  results: PropTypes.array,
};

export default memo(GrowthScenarioChart);
