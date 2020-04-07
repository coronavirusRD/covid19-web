import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { Paper } from "../../../components";

const HomeHeaderPaper = ({ year, month, weekday, day, time }) => {
  return (
    <Grid item md={5}>
    <Paper className="covid19-info-paper" type="dark">
      <Typography variant="h4">{weekday}</Typography>
      <Typography variant="h5">
        {day} de {month} de {year}
      </Typography>
      <Typography variant="h5">{time}</Typography>
    </Paper>
  </Grid>
  );
};

HomeHeaderPaper.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  weekday: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
};

export default memo(HomeHeaderPaper);
