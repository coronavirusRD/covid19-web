import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Typography } from "@material-ui/core";

const Title = ({ className, text }) => {
  return (
    <Typography className={classnames(className, "covid19-title")} variant="h2">
      {text}
    </Typography>
  );
};

Title.defaultProps = {
  className: null,
};

Title.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default memo(Title);
