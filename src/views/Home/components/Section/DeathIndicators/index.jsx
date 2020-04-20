import './style.scss';
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Chart, Title } from "../../../../../components";
import { useDeathIndicator } from "../../../../../hooks";

const DeathIndicatorsSection = ({ currentDate, longStartDate, results }) => {
  const data = useDeathIndicator(currentDate, results);

  return (
    <div className="covid19-death-indicators-section section">
      <Title text="Indicadores sobre defunciones/fallecidos" />
      <Grid item xs={12}>
        <Chart
          className="covid19-top-provinces-deaths-chart"
          height={275}
          title={`provincias abarcan ${data.topDeathsGenderPercent}% (${data.topDeathsGender}/${data.totalDeaths}) defunciones`}
          primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
          colors={["#d0021b"]}
          data={data.topProvincesDeathsData}
        />
      </Grid>
      <Grid className="covid19-death-indicators-charts-container" container>
        <Grid className="covid19-deaths-gender-chart" item md={6}>
          <Chart
            className="covid19-deaths-gender-chart"
            height={275}
            title="distribuci&oacute;n defunciones por sexo"
            note={`62 años mediana edad de fallecidos - ${data.topDeathsGenderPercent}% ${data.topDeathsGenderKey}`}
            primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
            noteLocationBottom={false}
            colors={["#7ed321", "#3cb4bb"]}
            data={data.currentGenderDeathsData}
          />
        </Grid>
        <Grid item md={6}>
          <Chart
            className="covid19-provinces-deaths-rate-chart"
            type="line"
            height={275}
            title="tasa de letalidad provincias m&aacute;s defunciones"
            primarySource="Ministerio de Salud P&uacute;blica de la R.D."
            colors={["#b664fe"]}
            data={data.topProvincesDeathRateData}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Chart
          className="covid19-deaths-chart"
          type="area"
          height={350}
          title="comparativo del total de defunciones y nuevas defunciones por d&iacute;a"
          note={`el gráfico comienza el ${longStartDate}`}
          noteLocationBottom={false}
          primarySource="Ministerio de Salud P&uacute;blica de la R.D."
          colors={["#000", "#b664fe"]}
          data={data.deathsResults}
        />
      </Grid>
    </div>
  );
};

DeathIndicatorsSection.defaultProps = {
  currentDate: null,
  longStartDate: '',
  results: [],
};

DeathIndicatorsSection.propTypes = {
  currentDate: PropTypes.object,
  longStartDate: PropTypes.string,
  results: PropTypes.array,
};

export default memo(DeathIndicatorsSection);
