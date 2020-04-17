import "./style.scss";
import React, { memo } from "react";
import isEmpty from "lodash/isEmpty";
import { CircularLoader } from "../../components";
import { useFetchCovidResults } from "../../hooks";
import ActualStateSection from "./components/Section/ActualState";
import GrowthEstimatesSection from "./components/Section/GrowthEstimates";
import IndicatorsSection from "./components/Section/IndicatorsSection";
import { COVID_RESULTS } from "./graphql";

const today = new Date();

const Home = ({ match: { params } }) => {
  console.log(params);
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
    !isEmpty(params.date) ? params.date : today
  );

  console.log("DATA", results);

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
      <IndicatorsSection currentDate={date.currentDate} startDate={date.shortStartDate} startMonth={date.startMonth} results={results} />
    </div>
  );
};

export default memo(Home);
