import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Chart, Title } from "../../../../../components";
import { useProvincesConfirmedEvolution } from "../../../../../hooks";

const ProvincesConfirmedEvolutionSection = ({
  currentDate,
  startDate,
  startMonth,
  results,
}) => {
  const data = useProvincesConfirmedEvolution(currentDate, results);

  return (
    <div className="covid19-provinces-confirmed-evolution-section section">
      <Title text="Evoluci&oacute;n confirmados y situaci&oacute;n provincias" />
      <Grid container>
        <Grid
          className="covid19-provinces-confirmed-chart-wrapper"
          xs={12}
          item
        >
          <Chart
            layout="vertical"
            height={1000}
            title="prov con mayor cant. casos confirmados e incidencia acumulada (ia) por 100,000 hab."
            primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE) | Oficina Nacional de Estad&iacute;sticas (ONE)"
            xaxis={{
              type: "number",
            }}
            yaxis={{
              type: "category",
              dataKey: "name",
            }}
            colors={["#6090d7", "#f79a3a"]}
            data={data.provincesConfimedIncidenceResults}
          />
        </Grid>
        <Grid
          className="covid19-hospitable-variation-chart-wrapper"
          item
          md={6}
        >
          <Chart
            className="covid19-hospitable-variation-chart"
            type="line"
            height={275}
            title="variaci&oacute;n de casos en aislamiento hospitalario"
            primarySource="Ministerio de Salud P&uacute;blica de la R.D."
            colors={["#d0021b", "#3cb4bb"]}
            data={data.hospitableResults}
          />
        </Grid>
        <Grid
          className="covid19-domiciliary-variation-chart-wrapper"
          item
          md={6}
        >
          <Chart
            className="covid19-domiciliary-variation-chart"
            type="line"
            height={275}
            title="variaci&oacute;n de casos en aislamiento domiciliario"
            primarySource="Ministerio de Salud P&uacute;blica de la R.D."
            colors={["#d0021b", "#3cb4bb"]}
            data={data.domiciliaryResults}
          />
        </Grid>
        <Grid
          className="covid19-top-provinces-confirmed-chart-wrapper"
          item
          xs={12}
        >
          <Chart
            className="covid19-top-provinces-chart"
            type="line"
            height={500}
            title="evoluci&oacute;n del virus en las 5 provincias con m&aacute;s casos confirmados"
            note={`el gráfico comienza el ${startDate}`}
            primarySource="ministerio de salud p&uacute;blica de la r.d."
            noteLocationBottom={false}
            colors={["#f79a3a", "#d0021b", "#7ed321", "#6090d7", "#12454d"]}
            data={data.provincesTopCurrentConfirmed}
          />
        </Grid>
        <Grid className="covid19-active-cases-chart-wrapper" item xs={12}>
          <Chart
            className="covid19-active-cases-chart"
            type="line"
            height={500}
            title={`casos activos a partir de ${startMonth}`}
            note={"Activos = confirmados - fallecidos - recuperados"}
            noteLocationBottom={false}
            colors={["#d0021b"]}
            data={data.activeResultsData}
          />
        </Grid>
        <Grid
          className="covid19-new-cases-provinces-chart-wrapper"
          item
          xs={12}
        >
          <Chart
            className="covid19-new-cases-provinces-chart"
            height={500}
            title="casos nuevos por provincia"
            colors={["#f79a3a"]}
            data={data.provincesNewConfirmedData}
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProvincesConfirmedEvolutionSection.defaultProps = {
  currentDate: null,
  startDate: "",
  startMonth: "",
  results: [],
};

ProvincesConfirmedEvolutionSection.propTypes = {
  currentDate: PropTypes.object,
  startDate: PropTypes.string,
  startMonth: PropTypes.string,
  results: PropTypes.array,
};

export default memo(ProvincesConfirmedEvolutionSection);
