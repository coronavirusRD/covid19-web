import "./style.scss";
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Grid, Typography } from "@material-ui/core";
import { useGrowthEstimates } from "../../../../../hooks";
import { Chart, StickyNote, Subtitle, Title } from "../../../../../components";
import GrowthScenarioChart from "../../Chart/GrowthScenarioChart";

const OMS_INFECTION_FACTOR = "2.00";

const GrowthEstimatesSection = ({
  shortStartDate,
  longStartDate,
  longEstimateDate,
  shortEstimateDate,
  fullEstimateDate,
  infectionFactor,
  averageInfectionFactor,
  results,
}) => {
  const data = useGrowthEstimates({
    shortStartDate: shortStartDate,
    longStartDate: longStartDate,
    longEstimateDate: longEstimateDate,
    shortEstimateDate: shortEstimateDate,
    fullEstimateDate: fullEstimateDate,
    infectionFactor: infectionFactor,
    averageInfectionFactor: averageInfectionFactor,
    omsInfectionFactor: OMS_INFECTION_FACTOR,
    results: results,
  });
  const [combined, setCombined] = useState([]);

  useEffect(() => {
    if (!isEmpty(data.items)) {
      const combined = data.items[0].chartData.map((item, idx) => {
        return {
          name: item.name,
          [`F.I = ${averageInfectionFactor}`]: item.confirmados,
          [`F.I = ${infectionFactor}`]: data.items[1].chartData[idx].confirmados,
          [`F.I = ${OMS_INFECTION_FACTOR}`]: data.items[2].chartData[idx].confirmados,
        };
      });

      setCombined(combined);
    }
  }, [data.items]); //eslint-disable-line

  return (
    <div className="covid19-growth-estimates-section section">
      <Title text={data.title} />
      <Subtitle text={data.subtitle} />
      {data.items.map((item, idx) => {
        const scenenarioNumber = idx + 1;

        return (
          <Grid key={idx} className="covid19-growth-estimate-item" container>
            <Typography
              className="covid19-growth-estimate-item-title"
              variant="h5"
            >
              escenario #{scenenarioNumber}: {item.title}
            </Typography>
            <Grid className="covid19-growth-estimate-sn-wrapper" container>
              {item.stickyNotes.map((props, index) => {
                return (
                  <Grid key={`sticky-note-${index}`} className="covid19-growth-estimate-sn-item" item xs={12} md={4}>
                    <StickyNote {...props} />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <GrowthScenarioChart
                  title={`evolucion del virus en escenario # ${scenenarioNumber}`}
                  data={item.chartData}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
      <Typography className="covid19-growth-estimate-item-title" variant="h5">
        En este gr&aacute;fico se comparan los tres escenarios presentados
        anteriormente
      </Typography>
      <Chart
        className="covid19-evolution-chart"
        type="line"
        height={700}
        title=""
        primarySource="Johns Hopkins Coronavirus Resource Center"
        explanatoryNote="F.I. = Factor de Infecci&oacute;n"
        colors={["#4a90e2", "#417504", "#d0021b"]}
        data={combined}
      />
    </div>
  );
};

GrowthEstimatesSection.defaultProps = {
  shortStartDate: "",
  longStartDate: "",
  longEstimateDate: "",
  shortEstimateDate: "",
  fullEstimateDate: "",
  infectionFactor: "0",
  averageInfectionFactor: "0",
  results: [],
};

GrowthEstimatesSection.propTypes = {
  shortStartDate: PropTypes.string,
  longStartDate: PropTypes.string,
  longEstimateDate: PropTypes.string,
  shortEstimateDate: PropTypes.string,
  fullEstimateDate: PropTypes.string,
  infectionFactor: PropTypes.string,
  averageInfectionFactor: PropTypes.string,
  results: PropTypes.array,
};

export default memo(GrowthEstimatesSection);
