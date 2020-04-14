import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";

const GrowthScenarioChart = ({ data }) => {
  return (
    <Chart
      className="covid19-growth-scenario1"
      type="area"
      height={350}
      title="evoluci&oacute;n del virus en escenario # 1"
      primarySource="Johns Hopkins Coronavirus Resource Center"
      data={data}
      withLabels={true}
    />
  );
};

GrowthScenarioChart.defaultProps = {
  data: [],
};

GrowthScenarioChart.propTypes = {
  data: PropTypes.array,
};

export default memo(GrowthScenarioChart);
