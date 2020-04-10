import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  ConfirmedCases,
  InfectionFactor,
  StickyNote,
} from "../../../../../components";
import SinaveChart from "../../Chart/SinaveChart";

const SummaryCases = ({
  total,
  newCases,
  recovered,
  deceased,
  discarded,
  infectionFactor,
  oldInfectionFactor,
  date,
}) => {
  const [rates, setRates] = useState({
    recovered: 0,
    lethality: 0,
  });

  useEffect(() => {
    setRates({
      recovered: Math.round((recovered / total) * 100),
      lethality: Math.round((deceased / total) * 100),
    });
  }, [total, recovered, deceased]);

  return (
    <Grid className="covid19-summary-cases" container direction="row">
      <Grid className="covid19-confirmed-cases" item lg={3}>
        <ConfirmedCases total={total} />
      </Grid>
      <Grid className="covid19-summary-cases-stack" item md={12} lg={6}>
        <Grid item sm={6}>
          <Grid container direction="column">
            <Grid className="summary-cases-sn-wrapper" item>
              <StickyNote value={newCases} title="aumento de confirmados" />
            </Grid>
            <Grid className="summary-cases-sn-wrapper" item>
              <StickyNote
                value={recovered}
                title="pacientes recuperados"
                description={`tasa de recuperación ${rates.recovered}%`}
                type="success"
              />
            </Grid>
            <Grid className="summary-cases-sn-wrapper" item>
              <StickyNote
                value={deceased}
                title="fallecidos"
                description={`tasa de letalidad ${rates.lethality}%`}
                type="danger"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <InfectionFactor
            date={date}
            today={infectionFactor}
            yesterday={oldInfectionFactor}
            difference={infectionFactor - oldInfectionFactor}
          />
        </Grid>
      </Grid>
      <Grid className="covid19-suspects-chart" item xs={12} lg={3}>
        <SinaveChart confirmed={total} discarded={discarded} />
      </Grid>
    </Grid>
  );
};

SummaryCases.defaultProps = {
  total: 0,
  newCases: 0,
  recovered: 0,
  deceased: 0,
  discarded: 0,
  infectionFactor: 0,
  oldInfectionFactor: 0,
  date: null,
};

SummaryCases.propTypes = {
  total: PropTypes.number,
  newCases: PropTypes.number,
  recovered: PropTypes.number,
  deceased: PropTypes.number,
  discarded: PropTypes.number,
  infectionFactor: PropTypes.string,
  oldInfectionFactor: PropTypes.string,
  date: PropTypes.object,
};

export default memo(SummaryCases);
