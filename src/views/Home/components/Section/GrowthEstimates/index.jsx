import "./style.scss";
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addDays, getDate, getMonth } from "date-fns";
import { Grid, Typography } from "@material-ui/core";
import { useDetailDate } from "../../../../../hooks";
import { Paper, StickyNote, Subtitle, Title } from "../../../../../components";
import { formatDate } from "../../../../../utils";
import GrowthScenarioChart from "../../Chart/GrowthScenarioChart";

const formatter1 = new Intl.DateTimeFormat("es", {
  month: "long",
});
const formatter2 = new Intl.DateTimeFormat("es", {
  weekday: "long",
});

const GrowthEstimatesSection = ({ currentDate, results }) => {
  const [date, setDate] = useState({
    estimateDate: "",
    formattedDate: "",
  });
  const d = useDetailDate(results);

  useEffect(() => {
    if (currentDate) {
      const estimateDate = addDays(currentDate, 5);

      setDate({
        shortEstimateDate: `${getDate(estimateDate)}/${getMonth(estimateDate)}`,
        longEstimateDate: formatDate(estimateDate),
        fullEstimateDate: `${getDate(estimateDate)} de ${formatter1.format(
          estimateDate
        )} de ${formatter2.format(estimateDate)}`,
        currentFormattedDate: `${getDate(currentDate)}/${getMonth(
          currentDate
        )}`,
      });
    }
  }, [currentDate]);

  return (
    <div className="covid19-growth-estimates-section section">
      <Title text="Estimaciones del crecimiento del virus" />
      <Subtitle
        text={`Nota: extendimos las estimaciones hasta el ${
          date.longEstimateDate
        } (+5 días) y los escenarios comienzan a partir del día ${formatDate(
          d.start
        )}`}
      />
      <Grid className="covid19-growth-estimate-item" container>
        <Typography className="covid19-growth-estimate-item-title" variant="h5">
          escenario #1: usando el <u>factor promedio</u> de infecc&oacute;n al{" "}
          {date.currentFormattedDate}
        </Typography>
        <Grid className="covid19-growth-estimate-sn-wrapper" container>
          <Grid item xs={12} md={4}>
            <StickyNote
              value="1.29"
              title="factor promedio de infecci&oacute;n"
              description={`del 22/3 al ${date.shortEstimateDate}`}
              type="warning"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StickyNote
              value="6,234"
              title={`estimación cantidad de posibles casos para el ${date.fullEstimateDate}`}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StickyNote
              title={`Esta condición solo se da si este factor de
              infección se mantiene hasta el ${date.shortEstimateDate}; esto puede aumentar o disminuir.`}
              type="note"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <GrowthScenarioChart />
        </Grid>
      </Grid>
      <Grid className="covid19-growth-estimate-item" container>
        <Typography className="covid19-growth-estimate-item-title" variant="h5">
          escenario #2: usando el factor de infecc&oacute;n m&aacute;s reciente
          al {date.currentFormattedDate}
        </Typography>
        <Grid className="covid19-growth-estimate-sn-wrapper" container>
          <Grid item xs={12} md={4}>
            <StickyNote
              value="1.11"
              title="factor de infecci&oacute;n m&aacute;s reciente"
              type="warning"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StickyNote
              value="2,940"
              title={`estimación cantidad de posibles casos para el ${date.fullEstimateDate}`}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StickyNote
              title={`Esta condición solo se da si este factor de
              infección se mantiene hasta el ${date.shortEstimateDate}; esto puede aumentar o disminuir.`}
              type="note"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <GrowthScenarioChart />
        </Grid>
      </Grid>
      <Grid className="covid19-growth-estimate-item" container>
        <Typography className="covid19-growth-estimate-item-title" variant="h5">
          escenario #3: usando el factor de infecc&oacute;n menor de la oms para
          el covid-19
          <span className="danger-text">(poco probable)</span>
        </Typography>
        <Grid className="covid19-growth-estimate-sn-wrapper" container>
          <Grid item xs={12} md={4}>
            <StickyNote
              value="2.00"
              title="factor de infecci&oacute;n menor de la oms"
              type="warning"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StickyNote
              value="55,840"
              title={`estimación cantidad de posibles casos para el ${date.fullEstimateDate}`}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StickyNote
              title={`Esta condición solo se da si este factor de
              infección se mantiene hasta el ${date.shortEstimateDate}; esto puede aumentar o disminuir.`}
              type="note"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <GrowthScenarioChart />
        </Grid>
      </Grid>
    </div>
  );
};

GrowthEstimatesSection.defaultProps = {
  currentDate: null,
  results: [],
};

GrowthEstimatesSection.propTypes = {
  currentDate: PropTypes.object,
  results: PropTypes.array,
};

export default memo(GrowthEstimatesSection);
