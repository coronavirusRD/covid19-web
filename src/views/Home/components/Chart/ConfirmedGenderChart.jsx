import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import has from "lodash/has";
import { Chart } from "../../../../components";

const ConfirmedGenderChart = ({ results }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const item = results[results.length - 1];

    if (has(item, "gender")) {
      setData([{
        mujeres: item.gender.women.confirmed,
        hombres: item.gender.men.confirmed,
      }]);
    }
  }, [results]);

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

ConfirmedGenderChart.defaultProps = {
  results: [],
};

ConfirmedGenderChart.propTypes = {
  results: PropTypes.array,
};

export default memo(ConfirmedGenderChart);
