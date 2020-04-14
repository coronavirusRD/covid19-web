import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { useGrowthEstimates } from "../../../../../hooks";
import { StickyNote, Subtitle, Title } from "../../../../../components";
import GrowthScenarioChart from "../../Chart/GrowthScenarioChart";

const GrowthEstimatesSection = ({ currentDate, infectionFactor, averageInfectionFactor, results }) => {
  const data = useGrowthEstimates({
    currentDate: currentDate,
    infectionFactor: infectionFactor,
    averageInfectionFactor: averageInfectionFactor,
    results: results,
  });

  return (
    <div className="covid19-growth-estimates-section section">
      <Title text={data.title} />
      <Subtitle text={data.subtitle} />
      {data.items.map((item, idx) => {
        return (
          <Grid key={idx} className="covid19-growth-estimate-item" container>
            <Typography
              className="covid19-growth-estimate-item-title"
              variant="h5"
            >
              escenario #{idx + 1}: {item.title}
            </Typography>
            <Grid className="covid19-growth-estimate-sn-wrapper" container>
              {item.stickyNotes.map((props, index) => {
                return (
                  <Grid key={`sticky-note-${index}`} item xs={12} md={4}>
                    <StickyNote {...props} />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <GrowthScenarioChart
                  data={item.chartData}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

GrowthEstimatesSection.defaultProps = {
  currentDate: null,
  infectionFactor: "0",
  averageInfectionFactor: "0",
  results: [],
};

GrowthEstimatesSection.propTypes = {
  currentDate: PropTypes.object,
  infectionFactor: PropTypes.string,
  averageInfectionFactor: PropTypes.string,
  results: PropTypes.array,
};

export default memo(GrowthEstimatesSection);
