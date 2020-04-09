import "./style.scss";
import React, { memo } from "react";
import isEmpty from "lodash/isEmpty";
import { Grid, Typography } from "@material-ui/core";
import { Chart, CircularLoader } from "../../components";
import { useFetchCovidResults } from "../../hooks";
import Header from "./components/Header";
import HeaderPaper from "./components/HeaderPaper";
import SummaryCases from "./components/SummaryCases";
import { COVID_RESULTS } from "./graphql";

const date = new Date();

const Home = ({ match: { params } }) => {
  const {
    loading,
    results,
    currentData,
    oldData,
    year,
    month,
    monthNumber,
    weekday,
    day,
    time,
    isToday,
  } = useFetchCovidResults(
    COVID_RESULTS,
    ["Dominican Republic"],
    !isEmpty(params.date) ? params.date : date
  );

  console.log("DATA", currentData);

  if (!currentData || loading) {
    return <CircularLoader />;
  }

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
          time={isToday ? time : ''}
        />
      </Grid>
      <Typography className="covid19-summary-title" variant="h5">
        RESUMEN
      </Typography>
      <SummaryCases
        total={currentData.confirmed}
        newCases={currentData.confirmed - oldData.confirmed}
        recovered={currentData.recovered}
        deceased={currentData.deaths}
        day={day}
        month={monthNumber}
      />
      <Grid item xs={12}>
        <Chart
          className="covid19-evolution-chart"
          type="line"
          height={700}
          title="evoluci&oacute;n del virus a nivel de casos confirmados en el pa&iacute;s"
          note="el gr&aacute;fico comienza a partir del 20/3/2020 (m&aacute;s de 20 casos nuevos en ese d&iacute;a)"
          primarySource="Ministerio de Salud P&uacute;blica de la R.D. | Johns Hopkins Coronavirus Resource Center"
          explanatoryNote="Los datos reportados en la gr&aacute;fica corresponden al corte del informe presentado por el Ministerio de Salud a las 10:00 a.m. del 05/04/2020"
          noteLocationBottom={false}
          colors={["#f79a3a", "#d0021b", "#7ed321"]}
          data={[
            {
              name: "19/03",
              confirmados: "0",
              defunciones: "0",
              recuperados: "0",
            },
            {
              name: "20/03",
              confirmados: "72",
              defunciones: "0",
              recuperados: "10",
            },
            {
              name: "21/03",
              confirmados: "52",
              defunciones: "7",
              recuperados: "3",
            },
          ]}
        />
      </Grid>
    </div>
  );
};

export default memo(Home);
