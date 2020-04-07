import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Paper from "../Paper";
import { numberWithCommas } from "../../utils";

const ConfirmedCases = ({ total }) => {
  return (
    <Paper className="confirmed-cases-paper" type="warning">
      <Typography className="confirmed-cases-title" variant="h6">
        casos confirmados
      </Typography>
      <Typography className="confirmed-cases-total" variant="h1">
        {numberWithCommas(total)}
      </Typography>
      <Typography className="confirmed-cases-description" variant="h6">
        incluyendo fallecidos y recuperados
      </Typography>
    </Paper>
  );
};

ConfirmedCases.defaultProps = {
  total: 0,
};

ConfirmedCases.propsTypes = {
  total: PropTypes.number.isRequired,
};

export default memo(ConfirmedCases);
