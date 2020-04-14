import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  AreaChart,
  Area,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { VERTICAL, HORIZONTAL } from "./constants";

const CovidBarChart = ({
  layout,
  dataKey,
  height,
  strokeDasharray,
  xaxis,
  yaxis,
  colors,
  data,
  withLabels,
}) => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (!isEmpty(data)) {
      const obj = omit(data[0], dataKey);

      setAreas(Object.keys(obj));
    }
  }, [dataKey, data]);

  return (
    <AutoSizer>
      {({ width }) => (
        <AreaChart
          className="covid19-area-chart"
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
          {areas.map((key, idx) => {
            let color = colors[0];

            if (colors.length > 1) color = colors[idx];

            return (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                fill={color}
              >
                <LabelList dataKey={key} position="top" />
              </Area>
            );
          })}
        </AreaChart>
      )}
    </AutoSizer>
  );
};

CovidBarChart.defaultProps = {};

CovidBarChart.propTypes = {
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
  withLabels: PropTypes.bool,
};

export default memo(CovidBarChart);
