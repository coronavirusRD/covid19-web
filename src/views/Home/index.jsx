import "./style.scss";
import React, { memo } from "react";
import isEmpty from "lodash/isEmpty";
import { Grid, Typography } from "@material-ui/core";
import { CircularLoader } from "../../components";
import { useFetchCovidResults } from "../../hooks";
import ActualStateSection from "./components/Section/ActualState";
import { COVID_RESULTS } from "./graphql";

const date = new Date();

const Home = ({ match: { params } }) => {
  const {
    loading,
    results,
    currentData,
    oldData,
    infectionFactor,
    oldInfectionFactor,
    currentDate,
    year,
    month,
    monthNumber,
    weekday,
    day,
    yesterday,
    time,
    isToday,
  } = useFetchCovidResults(
    COVID_RESULTS,
    ["Dominican Republic"],
    !isEmpty(params.date) ? params.date : date
  );

  console.log("DATA", results);

  if (!currentData || loading) {
    return <CircularLoader />;
  }

  return (
    <div className="home">
      <ActualStateSection
        date={{
          current: currentDate,
          year: year,
          month: month,
          monthNumber: monthNumber,
          weekday: weekday,
          day: day,
          yesterday: yesterday,
          time: isToday ? time : "",
        }}
        infectionFactor={infectionFactor}
        oldInfectionFactor={oldInfectionFactor}
        results={results}
        currentData={currentData}
        oldData={oldData}
      />
    </div>
  );
};

export default memo(Home);
