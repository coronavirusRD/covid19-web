import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { Title } from "../../../../../components";

const HomeHeader = ({ year, month }) => {
  return (
    <Grid item md={7}>
      <Title text="Estado actual del virus" />
      <Typography className="covid19-info-title" variant="h6">
        Fuentes primarias
      </Typography>
      <Typography className="covid19-info" variant="subtitle1">
        Ministerio de Salud P&uacute;blica de la R.D.
      </Typography>
      <Typography className="covid19-info" variant="subtitle1">
        Johns Hopkins Coronavirus Resource Center
      </Typography>
      <Typography className="covid19-info" variant="subtitle1">
        Sistema Nacional de Vigilancia Epidemiol&oacute;gica
      </Typography>
      <Typography className="covid19-info-date" variant="h6">
        <span className="year">{year}</span> |{" "}
        <span className="month">{month}</span>
      </Typography>
    </Grid>
  );
};

HomeHeader.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
};

export default memo(HomeHeader);
