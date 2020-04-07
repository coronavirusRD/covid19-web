import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

const InfectionDifference = ({value, increased}) => {
  return (
    <Grid className="covid19-infection-difference" item xs={12}>
      <FontAwesomeIcon icon={increased ? faSortUp : faSortDown} size="3x" color="#d0021b"/>
      <Typography className="covid19-infection-difference-value" variant="h5">
        {value}
      </Typography>
    </Grid>
  );
};

InfectionDifference.defaultProps = {
  value: 0,
  increased: true,
};

InfectionDifference.propTypes = {
  value: PropTypes.number,
  increased: PropTypes.bool,
};

export default memo(InfectionDifference);
