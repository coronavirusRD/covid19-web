import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import { Typography } from "@material-ui/core";
import Paper from "../Paper";
// import HorizontalChart from "./HorizontalChart";
// import VerticalChart from "./VerticalChart";

const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";

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

  // const getChart = () => {
  //   let Comp = undefined;

  //   if (props.type === VERTICAL) Comp = VerticalChart;
  //   else if (props.type === HORIZONTAL) Comp = HorizontalChart;

  //   return React.createElement(Comp, {
  //     ...pick(props, ["id", "labels", "datasets"]),
  //     legend: LEGEND,
  //   });
  // };

  return (
    <div className={classnames("covid19-chart", props.className, props.type)}>
      <Paper className="chart-paper">
        <>
          <Typography className="chart-title" variant="h6">
            {props.title}
          </Typography>
          {!props.noteLocationBottom && getNote()}
          {/* {getChart()} */}
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
              <Typography className="chart-bottom-explanatory-note-title" variant="subtitle1">
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
  type: "vertical",
  note: "",
  explanatoryNote: "",
  noteLocationBottom: true,
  labels: [],
  datasets: [],
};

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(["vertical", "horizontal"]),
  title: PropTypes.string.isRequired,
  note: PropTypes.string,
  primarySource: PropTypes.string,
  explanatoryNote: PropTypes.string,
  noteLocationBottom: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
  datasets: PropTypes.arrayOf(PropTypes.object),
};

export default memo(Chart);
