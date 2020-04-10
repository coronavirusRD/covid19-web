import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Typography } from "@material-ui/core";

const Subtitle = ({ className, text }) => {
  return (
    <Typography className={classnames(className, "covid19-subtitle")} variant="h5">
      {text}
    </Typography>
  );
};

Subtitle.defaultProps = {
  className: null,
};

Subtitle.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default memo(Subtitle);
