import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";

const ProvincesMostConfirmedCases = ({ data }) => {
  return (
    <Chart
      className="covid19-insulation-type-chart"
      height={275}
      title="distribuci&oacute; de confirmados entre sexos"
      primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
      colors={["#7ed321", "#3cb4bb"]}
      data={data}
    />
  );
};

ProvincesMostConfirmedCases.defaultProps = {
  data: [],
};

ProvincesMostConfirmedCases.propTypes = {
  data: PropTypes.array,
};

export default memo(ProvincesMostConfirmedCases);
