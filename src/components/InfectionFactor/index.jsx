import "./style.scss";
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { format, subDays } from "date-fns";
import { Grid, Typography } from "@material-ui/core";
import Paper from "../Paper";
import InfectionDifference from "../InfectionDifference";

const InfectionFactor = ({
  date,
  today,
  yesterday,
  difference,
}) => {
  const [oldDate, setOldDate] = useState({
    day: 0,
    month: 0,
  });

  useEffect(() => {
    if (date) {
      const d = subDays(date, 1);
      setOldDate({
        day: format(d, 'd'),
        month: format(d, 'L'),
      })
    };
  }, [date]);

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
          <InfectionDifference
            value={Math.abs(difference).toFixed(2)}
            increased={difference > 0}
          />
        </Grid>
        <Typography className="infection-factor-label" variant="subtitle1">
          por persona
        </Typography>
      </Grid>
      <Typography className="infection-factor-yesterday-title" variant="h5">
        Factor del {oldDate.day}/{oldDate.month}
      </Typography>
      <Typography className="infection-factor-yesterday-value" variant="h5">
        {yesterday}
      </Typography>
    </Paper>
  );
};

InfectionFactor.defaultProps = {
  date: null,
  today: 0,
  yesterday: 0,
  difference: 0,
};

InfectionFactor.propsTypes = {
  date: PropTypes.object,
  today: PropTypes.number,
  yesterday: PropTypes.number,
  difference: PropTypes.number,
};

export default memo(InfectionFactor);
