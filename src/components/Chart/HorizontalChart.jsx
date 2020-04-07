import React, { memo } from "react";
import PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";

const HorizontalChart = ({ id, labels, datasets, legend }) => {
  return (
    <HorizontalBar
      id={id}
      data={{
        labels: labels,
        datasets: datasets,
      }}
      legend={legend}
    />
  );
};

HorizontalChart.defaultProps = {
  labels: [],
  datasets: [],
  legend: null,
};

HorizontalChart.propTypes = {
  id: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
  datasets: PropTypes.arrayOf(PropTypes.object),
  legend: PropTypes.object,
};

export default memo(HorizontalChart);
