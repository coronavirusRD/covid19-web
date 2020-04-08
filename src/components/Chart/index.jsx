import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import { Typography } from "@material-ui/core";
import Paper from "../Paper";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { BAR, LINE, VERTICAL, HORIZONTAL } from "./constants";

const Chart = (props) => {
  const getNote = () => {
    if (isEmpty(props.note)) return "";

    return (
      <Typography className="chart-note" variant="subtitle1">
        <b>Nota:</b> {props.note}
      </Typography>
    );
  };

  const getChart = () => {
    let Comp = undefined;

    if (props.type === BAR) Comp = BarChart;
    else if (props.type === LINE) Comp = LineChart;

    console.log("COMP", Comp);

    return React.createElement(Comp, {
      ...pick(props, [
        "layout",
        "dataKey",
        "height",
        "strokeDasharray",
        "xaxis",
        "yaxis",
        "colors",
        "data",
      ]),
    });
  };

  return (
    <div className={classnames("covid19-chart", props.className, props.type)}>
      <Paper className="chart-paper">
        <>
          <Typography className="chart-title" variant="h6">
            {props.title}
          </Typography>
          {!props.noteLocationBottom && getNote()}
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              width: "100%",
              height: props.height,
            }}
          >
            {getChart()}
          </div>
          {props.noteLocationBottom && getNote()}
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
          {!isEmpty(props.explanatoryNote) && (
            <div>
              <Typography
                className="chart-bottom-explanatory-note-title"
                variant="subtitle1"
              >
                Nota aclaratoria
              </Typography>
              <Typography
                className="chart-bottom-description"
                variant="subtitle1"
              >
                {props.explanatoryNote}
              </Typography>
            </div>
          )}
        </>
      </Paper>
    </div>
  );
};

Chart.defaultProps = {
  className: null,
  type: BAR,
  layout: HORIZONTAL,
  dataKey: "name",
  height: 150,
  strokeDasharray: "3 3",
  note: "",
  explanatoryNote: "",
  noteLocationBottom: true,
  xaxis: {
    dataKey: "name",
    type: "category",
    hide: false,
  },
  yaxis: {
    dataKey: "",
    type: "number",
    hide: false,
  },
  colors: ["#4a90e2"],
  data: [],
};

Chart.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([]),
  layout: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  dataKey: PropTypes.string.isRequired,
  height: PropTypes.number,
  strokeDasharray: PropTypes.string,
  title: PropTypes.string.isRequired,
  note: PropTypes.string,
  primarySource: PropTypes.string,
  explanatoryNote: PropTypes.string,
  xaxis: PropTypes.shape({
    dataKey: PropTypes.string,
    type: PropTypes.string,
    hide: PropTypes.bool,
  }),
  yaxis: PropTypes.shape({
    dataKey: PropTypes.string,
    type: PropTypes.string,
    hide: PropTypes.bool,
  }),
  colors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  noteLocationBottom: PropTypes.bool,
};

export default memo(Chart);
