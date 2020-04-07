import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { HorizontalBar } from "react-chartjs-2";
import Paper from "../Paper";
import { numberWithCommas } from "../../utils";

const SuspectsChart = ({ total, day, month }) => {
  const label = `${numberWithCommas(total)} casos al ${day}/${month}`;

  return (
    <Paper className="suspects-chart">
      <Typography className="suspects-chart-title" variant="h6">
        casos sospechosos reportados al sinave
      </Typography>
      <HorizontalBar
        data={{
          labels: [label],
          datasets: [
            {
              label: "Confirmados",
              backgroundColor: '#4a90e2',
              data: [1828],
            },
            {
              label: "Descartados",
              backgroundColor: '#7ed321',
              data: [3661],
            },
          ],
        }}
      />
      <Typography className="suspects-chart-note" variant="subtitle1">
        <b>Nota:</b> las pruebas fueron descartadas por laboratorio.
      </Typography>
      <Typography className="suspects-chart-bottom-title" variant="subtitle1">
        Fuente primaria
      </Typography>
      <Typography
        className="suspects-chart-bottom-description"
        variant="subtitle1"
      >
        Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)
      </Typography>
    </Paper>
  );
};

SuspectsChart.defaultProps = {
  total: 0,
  day: 0,
  month: 0,
};

SuspectsChart.propTypes = {
  total: PropTypes.number,
  day: PropTypes.number,
  month: PropTypes.number,
};

export default memo(SuspectsChart);
