import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { VERTICAL, HORIZONTAL } from "./constants";

const CovidLineChart = ({
  layout,
  dataKey,
  height,
  strokeDasharray,
  xaxis,
  yaxis,
  colors,
  data,
}) => {
  const [lines, setBars] = useState([]);

  useEffect(() => {
    if (!isEmpty(data)) {
      const obj = omit(data[0], dataKey);

      setBars(Object.keys(obj));
    }
  }, [dataKey, data]);

  return (
    <AutoSizer>
      {({ width }) => (
        <LineChart
          className="covid19-bar-chart"
          layout={layout}
          data={data}
          width={width}
          height={height}
        >
          <CartesianGrid strokeDasharray={strokeDasharray} />
          <XAxis {...xaxis} />
          <YAxis {...yaxis} />
          <Tooltip />
          <Legend />
          {lines.map((key, idx) => {
            let color = colors[0];

            if (colors.length > 1) color = colors[idx];

            return <Line type="monotone" dataKey={key} stroke={color} />;
          })}
        </LineChart>
      )}
    </AutoSizer>
  );
};

CovidLineChart.defaultProps = {};

CovidLineChart.propTypes = {
  layout: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  dataKey: PropTypes.string,
  height: PropTypes.number,
  strokeDasharray: PropTypes.string,
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
};

export default memo(CovidLineChart);
