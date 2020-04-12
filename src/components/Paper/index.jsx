import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Paper as MaterialPaper } from "@material-ui/core";

const Paper = ({ className, type, elevation, children }) => {
  return (
    <MaterialPaper
      className={classnames(className, "covid19-paper", `paper-${type}`)}
      elevation={elevation}
    >
      {children}
    </MaterialPaper>
  );
};

Paper.defaultProps = {
  className: null,
  type: "info",
  elevation: 2,
};

Paper.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["info", "success", "warning", "danger", "dark", "note"]),
  elevation: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default memo(Paper);
