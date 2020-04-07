import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import isEmpty from "lodash/isEmpty";
import { Typography } from "@material-ui/core";
import Paper from "../Paper";
import HorizontalChart from "./HorizontalChart";

const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";
const TOP = "top";
const BOTTOM = "bottom";

const LEGEND = {
  position: "bottom",
  labels: {
    fontFamily: "Lato",
    fontColor: "#21262e",
    fontWeight: "bold",
  },
};

const Chart = (props) => {
  const getNote = () => {
    if (isEmpty(props.note)) return "";

    return (
      <Typography className="chart-note" variant="subtitle1">
        <b>Nota:</b> {props.note}
      </Typography>
    );
  };

  return (
    <div className={classnames("covid19-chart", props.type)}>
      <Paper className="chart-paper">
        <>
          <Typography className="chart-title" variant="h6">
            {props.title}
          </Typography>
          {props.noteLocation === TOP && getNote()}
          {props.type === HORIZONTAL && (
            <HorizontalChart {...props} legend={LEGEND} />
          )}
          {props.noteLocation === BOTTOM && getNote()}
          {!isEmpty(props.primarySource) && (
            <div>
              <Typography className="chart-bottom-title" variant="subtitle1">
                Fuente primaria
              </Typography>
              <Typography
                className="chart-bottom-description"
                variant="subtitle1"
              >
                {props.primarySource}
              </Typography>
            </div>
          )}
        </>
      </Paper>
    </div>
  );
};

Chart.defaultProps = {
  type: "vertical",
  note: "",
  noteLocation: "bottom",
  labels: [],
  datasets: [],
};

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["vertical", "horizontal"]),
  title: PropTypes.string.isRequired,
  note: PropTypes.string,
  primarySource: PropTypes.string,
  noteLocation: PropTypes.oneOf(["top", "bottom"]),
  labels: PropTypes.arrayOf(PropTypes.string),
  datasets: PropTypes.arrayOf(PropTypes.object),
};

export default memo(Chart);
