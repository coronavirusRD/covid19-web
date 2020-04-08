import "./style.scss";
import React, { memo } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Chart } from "../../components";
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
      <Grid item xs={12}>
        <Chart
          id="covid19-evolution-chart"
          className="covid19-evolution-chart"
          title="evoluci&oacute;n del virus a nivel de casos confirmados en el pa&iacute;s"
          note="el gr&aacute;fico comienza a partir del 20/3/2020 (m&aacute;s de 20 casos nuevos en ese d&iacute;a)"
          primarySource="Ministerio de Salud P&uacute;blica de la R.D. | Johns Hopkins Coronavirus Resource Center"
          explanatoryNote="Los datos reportados en la gr&aacute;fica corresponden al corte del informe presentado por el Ministerio de Salud a las 10:00 a.m. del 05/04/2020"
          noteLocationBottom={false}
        />
      </Grid>
    </div>
  );
};

export default memo(Home);
