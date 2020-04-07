import "./style.scss";
import React, { memo } from "react";
import { Grid, Typography } from "@material-ui/core";
import { ConfirmedCases, StickyNote } from "../../components";
import HomeHeader from "./components/HomeHeader";
import HomeHeaderPaper from "./components/HomeHeaderPaper";

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
  const weekday = formatter2.format(date);
  const day = date.getDate();

  return (
    <div className="home">
      <Grid
        className="covid19-info-container"
        container
        justify="space-between"
      >
        <HomeHeader year={year} month={month} />
        <HomeHeaderPaper
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
      <Grid container direction="row">
        <Grid item lg={3}>
          <ConfirmedCases total={1380} />
        </Grid>
        <Grid item lg={3}>
          <Grid container direction="column">
            <Grid item>
              <StickyNote value={96} title="aumento de confirmados" />
            </Grid>
            <Grid item>
              <StickyNote
                value={16}
                title="pacientes recuperados"
                description="tasa de recuperac&oacute;n 1.16%"
                type="success"
              />
            </Grid>
            <Grid item>
              <StickyNote
                value={60}
                title="fallecidos"
                description="tasa de letalidad 4% = 1/4"
                type="danger"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(Home);
