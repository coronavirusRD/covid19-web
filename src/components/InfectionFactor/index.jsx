import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import Paper from "../Paper";
import InfectionDifference from "../InfectionDifference";

const InfectionFactor = ({ day, month, today, yesterday, difference }) => {
  return (
    <Paper className="infection-factor-paper">
      <Typography className="infection-factor-title" variant="h6">
        factor de infecci&oacute;n
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography className="infection-factor-today-value" variant="h2">
            {today}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <InfectionDifference value={difference} increased={false} />
        </Grid>
        <Typography className="infection-factor-label" variant="subtitle1">
          por persona
        </Typography>
      </Grid>
      <Typography className="infection-factor-yesterday-title" variant="h5">
        Factor del {day}/{month}
      </Typography>
      <Typography className="infection-factor-yesterday-value" variant="h5">
        {yesterday}
      </Typography>
    </Paper>
  );
};

InfectionFactor.defaultProps = {
  day: 0,
  month: 0,
  today: 0,
  yesterday: 0,
  difference: 0,
};

InfectionFactor.propsTypes = {
  day: PropTypes.number,
  month: PropTypes.number,
  today: PropTypes.number,
  yesterday: PropTypes.number,
  difference: PropTypes.number,
};

export default memo(InfectionFactor);
