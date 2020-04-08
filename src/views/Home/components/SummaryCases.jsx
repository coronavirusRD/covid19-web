import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  ConfirmedCases,
  InfectionFactor,
  StickyNote,
  Chart,
} from "../../../components";
import { numberWithCommas } from "../../../utils";

const SummaryCases = ({ total, newCases, recovered, deceased, day, month }) => {
  const label = `${numberWithCommas(total)} casos al ${day}/${month}`;

  return (
    <Grid className="covid19-summary-cases" container direction="row">
      <Grid className="covid19-confirmed-cases" item lg={3}>
        <ConfirmedCases total={total} />
      </Grid>
      <Grid className="covid19-summary-cases-stack" item md={12} lg={6}>
        <Grid item sm={6}>
          <Grid container direction="column">
            <Grid item>
              <StickyNote value={newCases} title="aumento de confirmados" />
            </Grid>
            <Grid item>
              <StickyNote
                value={recovered}
                title="pacientes recuperados"
                description="tasa de recuperac&oacute;n 1.16%"
                type="success"
              />
            </Grid>
            <Grid item>
              <StickyNote
                value={deceased}
                title="fallecidos"
                description={`tasa de letalidad 4%`}
                type="danger"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <InfectionFactor
            day={day}
            month={month}
            today={1.07}
            yesterday={1.16}
            difference={0.09}
          />
        </Grid>
      </Grid>
      <Grid className="covid19-suspects-chart" item xs={12} lg={3}>
        <Chart
          layout="vertical"
          height={150}
          title="casos sospechosos reportados al sinave"
          note="las pruebas fueron descartadas por laboratorio."
          primarySource="Sistema Nacional de Vigilancia Epidemiol&oacute;gica (SINAVE)"
          xaxis={{
            type: "number",
          }}
          yaxis={{
            type: "category",
            hide: true,
          }}
          colors={["#4a90e2", "#7ed321"]}
          data={[
            { name: "confirmados", confirmados: "1828", descartados: "3361" },
          ]}
        />
      </Grid>
    </Grid>
  );
};

SummaryCases.defaultProps = {
  total: 0,
  newCases: 0,
  recovered: 0,
  deceased: 0,
  day: 0,
  month: 0,
};

SummaryCases.propTypes = {
  total: PropTypes.number,
  newCases: PropTypes.number,
  recovered: PropTypes.number,
  deceased: PropTypes.number,
  day: PropTypes.number,
  month: PropTypes.number,
};

export default memo(SummaryCases);
