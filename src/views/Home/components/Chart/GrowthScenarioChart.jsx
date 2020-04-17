import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";

const GrowthScenarioChart = ({ title, data }) => {
  return (
    <Chart
      className="covid19-growth-scenario1"
      type="area"
      height={350}
      title={title}
      primarySource="Johns Hopkins Coronavirus Resource Center"
      data={data}
      withLabels={true}
    />
  );
};

GrowthScenarioChart.defaultProps = {
  title: '',
  data: [],
};

GrowthScenarioChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default memo(GrowthScenarioChart);
