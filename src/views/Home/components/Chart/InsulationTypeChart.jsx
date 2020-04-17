import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import has from "lodash/has";
import { Chart } from "../../../../components";

const InsulationTypeChart = ({ results }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const item = results[results.length - 1];

    if (has(item, "insulation_type")) {
      setData([{
        hospitalario: item.insulation_type.hospitable,
        domiciliario: item.insulation_type.domiciliary,
      }]);
    }
  }, [results]);

  return (
    <Chart
      className="covid19-insulation-type-chart"
      height={275}
      title={`distrib. de confirmados según tipo de aislamiento excluyendo los recuperados (${results[results.length - 1].recovered}) y fallecidos (${results[results.length - 1].deaths})`}
      primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
      colors={["#7ed321", "#3cb4bb"]}
      data={data}
    />
  );
};

InsulationTypeChart.defaultProps = {
  results: [],
};

InsulationTypeChart.propTypes = {
  results: PropTypes.array,
};

export default memo(InsulationTypeChart);
