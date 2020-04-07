import "./style.scss";
import React, { memo } from "react";
import { Grid, Typography } from "@material-ui/core";
import Header from "./components/Header";
import HeaderPaper from "./components/HeaderPaper";
import SummaryCases from "./components/SummaryCases";

const Home = () => {
  const date = new Date();
  const formatter1 = new Intl.DateTimeFormat("es", {
    month: "long",
  });
  const formatter2 = new Intl.DateTimeFormat("es", {
    weekday: "long",
  });
  const year = date.getFullYear();
  const month = formatter1.format(date);
  const monthNumber = date.getMonth() + 1;
  const weekday = formatter2.format(date);
  const day = date.getDate();

  return (
    <div className="home">
      <Grid
        className="covid19-info-container"
        container
        justify="space-between"
      >
        <Header year={year} month={month} />
        <HeaderPaper
          year={year}
          month={month}
          weekday={weekday}
          day={day}
          time="2:30 p.m."
        />
      </Grid>
      <Typography className="covid19-summary-title" variant="h5">
        RESUMEN
      </Typography>
      <SummaryCases
        total={1380}
        newCases={96}
        recovered={16}
        deceased={60}
        day={day}
        month={monthNumber}
      />
    </div>
  );
};

export default memo(Home);
