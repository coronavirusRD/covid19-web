import "./style.scss";
import React, { memo } from "react";
import isEmpty from "lodash/isEmpty";
import { useTheme, useMediaQuery } from "@material-ui/core";
import { CircularLoader } from "../../components";
import { useFetchCovidResults } from "../../hooks";
import ActualStateSection from "./components/Section/ActualState";
import GrowthEstimatesSection from "./components/Section/GrowthEstimates";
import IndicatorsSection from "./components/Section/IndicatorsSection";
import { COVID_RESULTS } from "./graphql";

const MOBILE_LIMIT = 6;
const TABLET_LIMIT = 12;
const DESKTOP_LIMIT = 20;

const today = new Date();

const Home = ({ match: { params } }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const limit = isMobile ? MOBILE_LIMIT : isTablet ? TABLET_LIMIT : DESKTOP_LIMIT;

  const {
    loading,
    results,
    currentData,
    oldData,
    infectionFactor,
    oldInfectionFactor,
    averageInfectionFactor,
    date,
  } = useFetchCovidResults(
    COVID_RESULTS,
    ["Dominican Republic"],
    !isEmpty(params.date) ? params.date : today,
    limit,
  );

  if (!currentData || loading) {
    return <CircularLoader />;
  }

  return (
    <div className="home">
      <ActualStateSection
        date={date}
        infectionFactor={infectionFactor}
        oldInfectionFactor={oldInfectionFactor}
        results={results}
        currentData={currentData}
        oldData={oldData}
      />
      <GrowthEstimatesSection
        shortStartDate={date.shortStartDate}
        longStartDate={date.longStartDate}
        longEstimateDate={date.longEstimateDate}
        shortEstimateDate={date.shortEstimateDate}
        fullEstimateDate={date.fullEstimateDate}
        infectionFactor={infectionFactor}
        averageInfectionFactor={averageInfectionFactor}
        results={results}
      />
      <IndicatorsSection
        currentDate={date.currentDate}
        startDate={date.shortStartDate}
        startMonth={date.startMonth}
        results={results}
      />
    </div>
  );
};

export default memo(Home);
