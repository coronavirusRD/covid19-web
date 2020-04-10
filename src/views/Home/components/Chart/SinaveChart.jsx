import React, { memo } from "react";
import PropTypes from "prop-types";
import { Chart } from "../../../../components";

const SinaveChart = ({ confirmed, discarded }) => {
  return (
    <Chart
      layout="vertical"
      height={150}
      title="casos sospechosos reportados al sinave"
      note="las pruebas fueron descartadas por laboratorio."
      primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
      xaxis={{
        type: "number",
      }}
      yaxis={{
        type: "category",
        hide: true,
      }}
      colors={["#4a90e2", "#7ed321"]}
      data={[
        { name: "confirmados", confirmados: confirmed, descartados: discarded },
      ]}
      withLabels={false}
    />
  );
};

SinaveChart.defaultProps = {
  confirmed: 0,
  discarded: 0,
};

SinaveChart.propTypes = {
  confirmed: PropTypes.number,
  discarded: PropTypes.number,
};

export default memo(SinaveChart);
