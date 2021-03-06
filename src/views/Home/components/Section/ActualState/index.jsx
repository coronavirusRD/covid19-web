import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import Header from "./Header";
import HeaderPaper from "./HeaderPaper";
import SummaryCases from "./SummaryCases";
import ConfirmedEvolutionChart from "../../Chart/ConfirmedEvolutionChart";
import RecoveredEvolutionChart from "../../Chart/RecoveredEvolutionChart";
import DiscardedConfirmedChart from "../../Chart/DiscardedConfirmedChart";

const ActualStateSection = ({
  date,
  infectionFactor,
  oldInfectionFactor,
  results,
  currentData,
  oldData,
}) => {
  return (
    <div className="covid19-actual-state-section section">
      <Grid
        className="covid19-info-container"
        container
        justify="space-between"
      >
        <Header year={date.year} month={date.month} />
        <HeaderPaper
          year={date.year}
          month={date.month}
          weekday={date.weekday}
          day={date.day}
          time={date.time}
        />
      </Grid>
      <Typography className="covid19-summary-title" variant="h5">
        RESUMEN
      </Typography>
      <SummaryCases
        total={currentData.confirmed}
        yesterdayTotal={oldData.confirmed}
        newCases={currentData.confirmed - oldData.confirmed}
        recovered={currentData.recovered}
        deceased={currentData.deaths}
        discarded={currentData.discarded}
        infectionFactor={infectionFactor}
        oldInfectionFactor={oldInfectionFactor}
        date={date.currentDate}
        day={date.day}
        month={date.monthNumber}
      />
      <Grid item xs={12}>
        <ConfirmedEvolutionChart
          results={results}
          shortStartDate={date.shortStartDate}
        />
      </Grid>
      <Grid item xs={12}>
        <RecoveredEvolutionChart
          results={results}
          shortStartDate={date.shortStartDate}
        />
      </Grid>
      <Grid item xs={12}>
        <DiscardedConfirmedChart
          results={results}
          shortStartDate={date.shortStartDate}
        />
      </Grid>
    </div>
  );
};

ActualStateSection.defaultProps = {
  date: {
    current: null,
    longStartDate: "",
    longEndDate: "",
    year: 0,
    month: "",
    monthNumber: 0,
    weekday: "",
    day: 0,
    yesterday: 0,
    time: "",
  },
  infectionFactor: 0,
  oldInfectionFactor: 0,
  results: [],
  currentData: null,
  oldData: null,
};

ActualStateSection.propTypes = {
  date: PropTypes.shape({
    current: PropTypes.object,
    longStartDate: PropTypes.string,
    longEndDate: PropTypes.string,
    year: PropTypes.number,
    month: PropTypes.string,
    monthNumber: PropTypes.number,
    weekday: PropTypes.string,
    day: PropTypes.number,
    yesterday: PropTypes.number,
    time: PropTypes.string,
  }),
  infectionFactor: PropTypes.string,
  oldInfectionFactor: PropTypes.string,
  results: PropTypes.array,
  currentData: PropTypes.object,
  oldData: PropTypes.object,
};

export default memo(ActualStateSection);
