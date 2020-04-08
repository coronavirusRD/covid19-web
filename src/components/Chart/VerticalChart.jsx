import React, { memo } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

const VerticalChart = ({ id, labels, datasets, legend }) => {
  return (
    <Bar
      id={id}
      data={{
        labels: labels,
        datasets: datasets,
      }}
      legend={legend}
    />
  );
};

VerticalChart.defaultProps = {
  labels: [],
  datasets: [],
  legend: null,
};

VerticalChart.propTypes = {
  id: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
  datasets: PropTypes.arrayOf(PropTypes.object),
  legend: PropTypes.object,
};

export default memo(VerticalChart);
