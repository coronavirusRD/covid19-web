import "./style.scss";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Chart, Title } from "../../../../../components";
import { useProvincesConfirmedIndicators } from "../../../../../hooks";
import InsulationTypeChart from "../../Chart/InsulationTypeChart";
import ConfirmedGenderChart from "../../Chart/ConfirmedGenderChart";

const ProvincesConfirmedIndicatorSection = ({
  currentDate,
  results,
}) => {
  const data = useProvincesConfirmedIndicators(currentDate, results);

  return (
    <div className="covid19-provinces-confirmed-indicators-section section">
      <Title text="Indicadores confirmados y situaci&oacute;n provincias" />
      <Grid
        className="covid19-provinces-confirmed-indicators-charts-container"
        container
      >
        <Grid item md={6}>
          <InsulationTypeChart results={results} />
        </Grid>
        <Grid item md={6}>
          <ConfirmedGenderChart results={results} />
        </Grid>

        <Grid item md={6}>
          <Chart
            className="covid19-provices-most-confirmed-chart"
            height={275}
            title="las 5 provincias con m&aacute;s casos confirmados"
            primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
            colors={["#6090d7", "#f79a3a"]}
            data={data.provincesTopConfirmed}
          />
        </Grid>
        <Grid item md={6}>
          <Chart
            className="covid19-provinces-most-confirmed-percentage-chart"
            height={275}
            title={`provincias abarcan ${data.totalConfirmed} de casos confirmados`}
            primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
            colors={["#6090d7"]}
            data={data.provincesTopConfirmedPercent}
          />
        </Grid>
        <Grid item md={6}>
          <Chart
            className="covid19-provinces-top-confirmed-fi-chart"
            type="line"
            height={275}
            title="factor de infecci&oacute;n prov. con mayor confirmados"
            primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
            colors={["#7ed321"]}
            data={data.provincesTopFI}
          />
        </Grid>
        <Grid item md={6}>
          <Chart
            className="covid19-infection-factor-chart"
            type="line"
            height={275}
            title="evoluci&oacute;n del factor de infecci&oacute;n nacional"
            primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
            colors={["#b664fe"]}
            data={data.factorInfectionResults}
          />
        </Grid>
        <Grid item md={6}>
          <Chart
            className="covid19-confirmed-percentage-chart"
            height={275}
            title="variac&oacute;n % de los casos confirmados"
            primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
            colors={["#f79a3a"]}
            data={data.confirmedPercentageResults}
          />
        </Grid>
        <Grid item md={6}>
          <Chart
            className="covid19-reported-tests-chart"
            height={275}
            title="cantidad de pruebas reportadas por dia"
            primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
            colors={["#b664fe"]}
            data={data.reportedTestResults}
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProvincesConfirmedIndicatorSection.defaultProps = {
  currentDate: null,
  results: [],
};

ProvincesConfirmedIndicatorSection.propTypes = {
  currentDate: PropTypes.object,
  results: PropTypes.array,
};

export default memo(ProvincesConfirmedIndicatorSection);
